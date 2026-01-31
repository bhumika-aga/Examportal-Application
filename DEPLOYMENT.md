# Deployment Guide

This guide provides comprehensive instructions for deploying the Exam Portal application. Choose the method that best suits your needs.

- [**Option 1: Manual / Local Deployment**](#1-manual--local-deployment) (For VPS, local server, or development)
- [**Option 2: Cloud Deployment (Render.com)**](#2-cloud-deployment-rendercom-free-tier) (For quick, free hosting)

---

## 1. Manual / Local Deployment

Use this method if you want to run the application on your own server (e.g., AWS EC2, DigitalOcean) or locally.

### Prerequisites (Manual Deployment)

- **Java Development Kit (JDK) 17** or higher
- **Node.js** (v18+) and **npm**
- **Maven** (included via wrapper)

### Part A: Backend (Spring Boot)

1. **Navigate to backend directory**:

   ```bash
   cd examserver
   ```

2. **Build the application**:

   ```bash
   # Linux/Mac
   ./mvnw clean install -DskipTests

   # Windows
   mvnw.cmd clean install -DskipTests
   ```

3. **Run the JAR**:

   ```bash
   java -jar target/examserver-0.0.1-SNAPSHOT.jar
   ```

   - The server starts on **port 8080**.
   - API URL: `http://localhost:8080`

### Part B: Frontend (React)

1. **Navigate to frontend directory**:

   ```bash
   cd examfront
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build production version**:

   ```bash
   npm run build
   ```

   - This creates a `dist/` folder with static files.

4. **Serve the application**:
   You can use any static server (Nginx, Apache, or `serve`).

   ```bash
   npx serve -s dist -l 5173
   ```

   - The app runs on **port 5173**.

---

## 2. Cloud Deployment (Render.com Free Tier)

Use this method for free, zero-config cloud hosting.

### Prerequisites (Render Deployment)

- Free account on [Render.com](https://dashboard.render.com).
- Code pushed to GitHub.

### Method A: Blueprints (Recommended)

1. On Render Dashboard, click **New +** -> **Blueprint**.
2. Connect your repository.
3. Render detects `render.yaml` and sets up both Backend (Docker) and Frontend (Static) automatically.
4. Click **Apply**.

### Method B: Manual Render Setup (Step-by-Step)

If you prefer not to use Blueprints, follow these steps to deploy services individually.

#### 1. Backend Service (Spring Boot)

1. Click **New +** and select **Web Service**.
2. Connect your GitHub repository.
3. Fill in the details:
   - **Name**: `examportal-server`
   - **Runtime**: `Docker`
   - **Region**: Choose one close to you (e.g., Singapore, Frankfurt).
   - **Branch**: `main`
   - **Root Directory**: `examserver` <-- **CRITICAL**: Do not leave blank!
   - **Instance Type**: Free
4. Scroll down to **Environment Variables** and add:
   - `JWT_SECRET`: (Enter a long random string)
   - `JWT_EXPIRATION`: `36000000`
5. Click **Create Web Service**.
6. Wait for the build to finish. **Copy the URL** of your new backend (e.g., `https://examportal-server.onrender.com`).

#### 2. Frontend Service (React)

1. Click **New +** and select **Static Site**.
2. Connect the **same** GitHub repository.
3. Fill in the details:
   - **Name**: `examportal-client`
   - **Branch**: `main`
   - **Root Directory**: `examfront` <-- **CRITICAL**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Scroll down to **Environment Variables** and add:
   - `VITE_API_URL`: Paste your Backend URL here (No trailing slash).
     - Example: `https://examportal-server-pu0l.onrender.com`
5. Click **Create Static Site**.

6. **Important (Fix 404 Errors)**:
   - Go to your new Static Site's dashboard.
   - Click on **Redirects/Rewrites**.
   - Add a new rule:
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`
   - Click **Save Changes**. (This fixes issues when refreshing pages like `/login`).

#### 3. Verify

- Open the frontend URL provided by Render.
- Test login (allow ~1 minute for backend to wake up).

### ⚠️ Free Tier Limitations

- **Backend Spin Down**: Spins down after 15 mins inactivity. First request will be slow (~50s).
- **Data Persistence**: Uses H2 database (in-memory). **Data is lost** on restart/spin-down. Use a separate PostgreSQL database for persistence.
