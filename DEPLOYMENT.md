# Deployment

## Local / Self-hosted

### Prerequisites

- Java 17+
- Node.js 18+

### Backend

```bash
cd examserver

# Build the JAR
./mvnw clean package -DskipTests      # Linux/Mac
mvnw.cmd clean package -DskipTests   # Windows

# Run
java -jar target/examserver-0.0.1-SNAPSHOT.jar
```

The server starts on port 8080 by default. Override with the `PORT` env var.

### Frontend

```bash
cd examfront
npm install
npm run build
npx serve -s dist -l 5173
```

Set `VITE_API_URL` before building if the backend is not at `http://localhost:8080`:

```bash
VITE_API_URL=https://your-backend.example.com npm run build
```

---

## Render.com (free tier)

### Option A — Blueprint (recommended)

1. Push the repo to GitHub.
2. On Render Dashboard: **New → Blueprint**.
3. Connect the repository — Render detects `render.yaml` and provisions both services automatically.
4. Click **Apply**.

`render.yaml` already configures:

- Backend as a Docker web service with `JWT_SECRET` auto-generated and `CORS_ALLOWED_ORIGINS=*`
- Frontend as a static site with `VITE_API_URL` wired from the backend service URL

### Option B — Manual setup

**Backend (Web Service)**

| Setting        | Value        |
|----------------|--------------|
| Runtime        | Docker       |
| Root Directory | `examserver` |
| Instance Type  | Free         |

Environment variables to add:

| Key                    | Value                      |
|------------------------|----------------------------|
| `JWT_SECRET`           | Any long random string     |
| `JWT_EXPIRATION`       | `36000000`                 |
| `CORS_ALLOWED_ORIGINS` | `*` (or your frontend URL) |

Copy the backend URL after deploy (e.g. `https://examportal-server.onrender.com`).

**Frontend (Static Site)**

| Setting           | Value                          |
|-------------------|--------------------------------|
| Root Directory    | `examfront`                    |
| Build Command     | `npm install && npm run build` |
| Publish Directory | `dist`                         |

Environment variables to add:

| Key            | Value                                |
|----------------|--------------------------------------|
| `VITE_API_URL` | Your backend URL (no trailing slash) |

**Fix client-side routing (required)**

In the static site's dashboard → **Redirects/Rewrites**, add:

| Source | Destination   | Action  |
|--------|---------------|---------|
| `/*`   | `/index.html` | Rewrite |

This prevents 404s when users refresh on routes like `/login` or `/admin`.

---

## Free Tier Notes

- **Backend cold starts**: Render free tier spins down after 15 minutes of inactivity. The first request after idle
  takes ~30–50 seconds.
- **Data persistence**: The app uses an in-memory H2 database. All data is lost on every restart/spin-down. For
  persistence, replace the H2 datasource with a Render PostgreSQL instance (or any external database) and update
  `application.properties`.
