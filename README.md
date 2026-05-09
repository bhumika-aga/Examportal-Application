# Exam Portal

A full-stack online examination system built with **Spring Boot 3** (backend) and **React 18 + TypeScript** (frontend).

---

## Architecture Overview

```txt
examportal/
├── examserver/          # Spring Boot backend (REST API + JWT auth)
├── examfront/           # React + TypeScript frontend (Vite + TailwindCSS)
├── ExamPortal.postman_collection.json
├── DEPLOYMENT.md
└── render.yaml
```

### Backend — Spring Boot 3

The backend exposes a stateless REST API secured with JWT. It uses an in-memory H2 database seeded with sample data on
startup.

**Request flow:**

1. Client sends credentials to `POST /generate-token`
2. `AuthenticationController` authenticates via Spring Security's `AuthenticationManager`
3. A JWT is issued and returned — stored by the client in `localStorage`
4. Every subsequent request carries `Authorization: Bearer <token>`
5. `JwtAuthenticationFilter` (a `OncePerRequestFilter`) validates the token and populates the Spring `SecurityContext`
6. Controllers handle business logic; responses are JSON via Jackson

**Key concepts:**

| Concept               | Implementation                                                            |
|-----------------------|---------------------------------------------------------------------------|
| Authentication        | `UsernamePasswordAuthenticationToken` + `BCryptPasswordEncoder`           |
| Authorization         | Stateless JWT (`jjwt` library, HS256 signing)                             |
| Token validation      | `JwtUtils` — signs/verifies with a shared HMAC-SHA secret                 |
| User identity         | `User` implements Spring's `UserDetails`; roles via `UserRole` join table |
| Security filter chain | `JwtAuthenticationFilter` before `UsernamePasswordAuthenticationFilter`   |
| CORS                  | `CorsConfigurationSource` bean; origin patterns configurable via env var  |
| Data seeding          | `DataInitializer implements CommandLineRunner` — runs on startup          |

**Domain model:**

```txt
User ──< UserRole >── Role
Category ──< Quiz ──< Question
```

- A **Category** groups related **Quizzes**
- A **Quiz** has many **Questions** and a configurable max-marks and question count
- When serving questions to a user, answers are cleared and the list is shuffled
- Quiz evaluation (`POST /question/eval-quiz`) looks up the real answers server-side and computes the score

**Why H2?** Simplicity for dev/demo. The schema is managed via `spring.jpa.hibernate.ddl-auto=update` so tables are
auto-created from entities. For production, swap the datasource for PostgreSQL or MySQL — no code changes needed.

### Frontend — React 18 + TypeScript

A single-page app (SPA) with two separate dashboards: **Admin** and **User**. All data fetching goes through the Axios
client with JWT automatically attached.

**Key patterns:**

| Pattern              | Tool                                                                |
|----------------------|---------------------------------------------------------------------|
| API client           | Axios with request/response interceptors                            |
| Server state         | TanStack React Query (cache, refetch, invalidation)                 |
| Form handling        | React Hook Form                                                     |
| Routing              | React Router v6 nested routes                                       |
| Auth state           | React Context (`AuthContext`) with `localStorage` token persistence |
| Notifications        | react-hot-toast                                                     |
| Confirmation dialogs | SweetAlert2                                                         |
| Styling              | TailwindCSS + CSS custom properties for dark mode                   |
| Animations           | framer-motion (page transitions)                                    |

**Auth flow:**

1. `AuthContext` initializes by checking `localStorage` for an existing token
2. If found, it fetches `/current-user` to restore the session — or clears it if the token is invalid/expired
3. The `login()` function returns the `User` object so the login page can redirect based on role (`ADMIN` → `/admin`,
   else `/user-dashboard`)
4. The Axios response interceptor catches 401s and auto-redirects to `/login`

**Quiz-taking flow:**

1. User selects a category → sees active quizzes
2. Clicks a quiz → reads instructions page (shows mark-per-question breakdown)
3. Starts quiz → questions are fetched from backend (answers blanked, list shuffled)
4. Timer starts (2 minutes per question)
5. User navigates through questions, selecting options
6. On submit (or timer expiry), answers are sent to `POST /question/eval-quiz`
7. Backend validates each `givenAnswer` against the stored correct answer and returns marks/score

---

## API Reference

All endpoints except `/generate-token`, `POST /user/`, and actuator/swagger paths require
`Authorization: Bearer <token>`.

### Auth

| Method | Path              | Description                |
|--------|-------------------|----------------------------|
| POST   | `/generate-token` | Login — returns JWT        |
| GET    | `/current-user`   | Get logged-in user details |

### Users

| Method | Path               | Description                                   |
|--------|--------------------|-----------------------------------------------|
| POST   | `/user/`           | Register new user (NORMAL role auto-assigned) |
| GET    | `/user/{username}` | Get user by username                          |
| DELETE | `/user/{userId}`   | Delete user                                   |

### Categories

| Method | Path              | Description                             |
|--------|-------------------|-----------------------------------------|
| GET    | `/category/`      | List all categories                     |
| GET    | `/category/{cId}` | Get category by ID                      |
| POST   | `/category/`      | Create category                         |
| PUT    | `/category/`      | Update category (include `cId` in body) |
| DELETE | `/category/{cId}` | Delete category                         |

### Quizzes

| Method | Path                          | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/quiz/`                      | List all quizzes                    |
| GET    | `/quiz/active`                | List active quizzes only            |
| GET    | `/quiz/{qId}`                 | Get quiz by ID                      |
| GET    | `/quiz/category/{cId}`        | Quizzes for a category              |
| GET    | `/quiz/category/active/{cId}` | Active quizzes for a category       |
| POST   | `/quiz/`                      | Create quiz                         |
| PUT    | `/quiz/`                      | Update quiz (include `qId` in body) |
| DELETE | `/quiz/{qId}`                 | Delete quiz                         |

### Questions

| Method | Path                          | Description                                    |
|--------|-------------------------------|------------------------------------------------|
| GET    | `/question/`                  | List all questions                             |
| GET    | `/question/{questionId}`      | Get question by ID                             |
| GET    | `/question/quiz/{quizId}`     | Questions for user (answers cleared, shuffled) |
| GET    | `/question/quiz/all/{quizId}` | Questions for admin (with answers)             |
| POST   | `/question/`                  | Add question                                   |
| PUT    | `/question/`                  | Update question                                |
| DELETE | `/question/{questionId}`      | Delete question                                |
| POST   | `/question/eval-quiz`         | Submit answers for grading                     |

#### Evaluate Quiz — Request/Response

Request body: list of question objects with `givenAnswer` populated.

```json
[
  {
    "questionId": 1,
    "givenAnswer": "class",
    "quiz": {
      "qId": 1,
      "maxMarks": "100"
    }
  }
]
```

Response:

```json
{
  "marksGot": 100.0,
  "correctAnswers": 5,
  "attempted": 5
}
```

### Health

| Method | Path               | Description               |
|--------|--------------------|---------------------------|
| GET    | `/actuator/health` | Application health status |

---

## Default Users

Seeded on startup by `DataInitializer`:

| Username | Password   | Role   |
|----------|------------|--------|
| `admin`  | `admin123` | ADMIN  |
| `user`   | `user123`  | NORMAL |

---

## Running Locally

### Prerequisites

- Java 17+
- Node.js 18+

### Backend

```bash
cd examserver
./mvnw spring-boot:run
```

- API: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:examportal`)
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend

```bash
cd examfront
npm install
npm run dev
```

- App: `http://localhost:5173`

### Configuration

Backend is configured via `application.properties`. Key env vars:

| Variable               | Default         | Purpose                                  |
|------------------------|-----------------|------------------------------------------|
| `PORT`                 | `8080`          | Server port                              |
| `JWT_SECRET`           | `examportal...` | HMAC signing key (change in production!) |
| `JWT_EXPIRATION`       | `36000000`      | Token TTL in milliseconds (10 hours)     |
| `CORS_ALLOWED_ORIGINS` | `*`             | Comma-separated allowed origins          |
| `DB_PASSWORD`          | `password`      | H2 database password                     |

Frontend reads `VITE_API_URL` from `.env` to override the backend URL (default: `http://localhost:8080`).

---

## Testing

Import `ExamPortal.postman_collection.json` into Postman. Run "Login Admin" first — the token is auto-saved as a
collection variable and applied to all authenticated requests.

---

## Docker

```bash
cd examserver
docker-compose up --build
```

Then run the frontend separately (`npm run dev`).

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render.com deployment instructions using `render.yaml`.
