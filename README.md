# Exam Portal Application

A comprehensive full-stack online examination system built with **Spring Boot 3** (Backend) and **React 18 + TypeScript** (Frontend).

## 🚀 Features

### User Module

- **Authentication**: Secure Login and Registration with JWT.
- **Dashboard**: View available quizzes by category.
- **Quiz Taking**:
  - Timer-based exams.
  - Auto-submission.
  - Interactive UI with no page refreshes.
- **Profile**: View user details and role.
- **Dark Mode**: Fully supported dark/light theme.

### Admin Module

- **Dashboard**: Overview of categories and quizzes.
- **Category Management**: Add/Update/Delete categories.
- **Quiz Management**: Create quizzes, set marks, timer, and active status.
- **Question Management**: Add/Edit questions with options and answers.

## 🛠 Tech Stack

### Backend

- **Java 17**
- **Spring Boot 3.4.9**
- **Spring Security** (JWT + BCrypt)
- **Spring Data JPA** (Hibernate)
- **H2 Database** (In-memory/File for Dev/Prod)
- **Docker** & **Spring Boot Docker Compose**

### Frontend

- **React 18** (Vite)
- **TypeScript**
- **TailwindCSS** (Styling)
- **React Query** (State Management)
- **React Hook Form** (Form Validation)
- **Lucide React** (Icons)
- **SweetAlert2** (Notifications)

## 🏃‍♂️ Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Docker (Optional but recommended)

### 🐳 Run with Docker (Recommended)

1. Clone the repository.
2. Run Docker Compose from the backend directory:

   ```bash
   cd examserver
   docker-compose up --build
   ```

   - **Backend**: <http://localhost:8080>
   - **Swagger UI**: <http://localhost:8080/swagger-ui.html>

3. Run the frontend separately:

   ```bash
   cd examfront
   npm install && npm run dev
   ```

   - **Frontend**: <http://localhost:5173>

### 💻 Manual Setup

#### Backend (`examserver`)

```bash
cd examserver
mvn spring-boot:run
```

#### Frontend (`examfront`)

```bash
cd examfront
npm install
npm run dev
```

## ☁️ Deployment (Render.com)

This project includes a `render.yaml` for easy deployment on Render.

1. Push to GitHub.
2. Create a new "Blueprint Instance" on Render.
3. Select your repository.
4. Render will deploy both backend and frontend automatically.

## 📝 API Documentation

API documentation is available via Swagger UI when the backend is running:
`http://localhost:8080/swagger-ui.html`

## 📚 Architecture Documentation

For a comprehensive guide to the system architecture, design patterns, and implementation details, see [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md).

## 📁 Project Structure

- `examserver/`: Spring Boot Backend (includes Dockerfile and docker-compose.yml)
- `examfront/`: React Frontend
- `render.yaml`: Cloud deployment config
- `PROJECT_ARCHITECTURE.md`: Detailed architecture documentation
