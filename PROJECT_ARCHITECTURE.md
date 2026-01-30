# Exam Portal - Project Architecture & Implementation Guide

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Authentication & Security](#authentication--security)
6. [API Endpoints](#api-endpoints)
7. [Data Flow](#data-flow)
8. [Deployment](#deployment)

---

## System Overview

The Exam Portal is a **full-stack online examination system** that allows:

- **Users** to register, login, browse quizzes by category, take timed exams, and view results
- **Admins** to manage categories, create quizzes, add questions, and monitor the system

### Technology Stack

| Layer        | Technology                | Purpose                   |
| ------------ | ------------------------- | ------------------------- |
| **Backend**  | Spring Boot 3.5 (Java 17) | REST API, Business Logic  |
| **Frontend** | React 18 + TypeScript     | User Interface            |
| **Styling**  | TailwindCSS               | Modern, responsive design |
| **Database** | H2 (In-Memory)            | Data persistence          |
| **Auth**     | JWT + BCrypt              | Stateless authentication  |
| **State**    | React Query               | Server state management   |
| **Build**    | Maven / Vite              | Project compilation       |

---

## Architecture Design

### High-Level Architecture

```text
┌─────────────────┐     HTTP/REST     ┌─────────────────┐
│                 │ ◄───────────────► │                 │
│  React Frontend │    (JSON + JWT)   │ Spring Backend  │
│   (Vite + TS)   │                   │  (REST API)     │
│                 │                   │                 │
└─────────────────┘                   └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │   H2 Database   │
                                      │   (In-Memory)   │
                                      └─────────────────┘
```

### Design Patterns Used

1. **Repository Pattern**: Data access abstracted through Spring Data JPA repositories
2. **Service Layer Pattern**: Business logic encapsulated in service classes
3. **DTO Pattern**: Separation between API models and domain entities
4. **Context Pattern**: React Context for global auth state management
5. **Custom Hook Pattern**: React Query hooks for data fetching and mutations

---

## Backend Implementation

### Package Structure

```text
com.examportal/
├── ExamserverApplication.java    # Main entry point
├── config/                       # Security & API configuration
│   ├── MySecurityConfig.java     # CORS, JWT filter chain, endpoints
│   ├── JwtUtils.java             # Token generation/validation
│   ├── JwtAuthenticationFilter.java  # Request filter
│   ├── JwtAuthenticationEntryPoint.java  # Unauthorized handler
│   └── OpenApiConfig.java        # Swagger configuration
├── controller/                   # REST endpoints
│   ├── AuthenticationController.java  # Login, current-user
│   ├── UserController.java       # Registration, user CRUD
│   ├── CategoryController.java   # Category CRUD
│   ├── QuizController.java       # Quiz CRUD + filtering
│   └── QuestionController.java   # Questions + evaluation
├── model/                        # JPA Entities
│   ├── User.java                 # User entity with roles
│   ├── Role.java                 # Role entity
│   ├── UserRole.java             # User-Role join entity
│   ├── Authority.java            # Spring Security authority
│   ├── JwtRequest.java           # Login request DTO
│   ├── JwtResponse.java          # Token response DTO
│   └── quiz/
│       ├── Category.java         # Quiz category
│       ├── Quiz.java             # Quiz with questions
│       └── Question.java         # Question with options
├── repository/                   # Spring Data JPA
│   ├── UserRepository.java
│   ├── RoleRepository.java
│   ├── CategoryRepository.java
│   ├── QuizRepository.java
│   └── QuestionRepository.java
├── service/                      # Business logic interfaces
│   ├── UserService.java
│   ├── CategoryService.java
│   ├── QuizService.java
│   ├── QuestionService.java
│   └── impl/                     # Implementations
│       ├── UserServiceImpl.java
│       ├── UserDetailsServiceImpl.java  # Spring Security
│       ├── CategoryServiceImpl.java
│       ├── QuizServiceImpl.java
│       └── QuestionServiceImpl.java
└── helper/                       # Exception classes
    ├── UserNotFoundException.java
    └── UserFoundException.java
```

### Entity Relationships

```text
┌──────────┐       ┌──────────┐       ┌──────────┐
│   User   │──────►│ UserRole │◄──────│   Role   │
└──────────┘  1:N  └──────────┘  N:1  └──────────┘

┌──────────┐       ┌──────────┐       ┌──────────┐
│ Category │◄──────│   Quiz   │──────►│ Question │
└──────────┘  1:N  └──────────┘  1:N  └──────────┘
```

### Key Entity Details

**User Entity**: Core user with Spring Security `UserDetails` implementation

- Stores username, password (BCrypt hashed), profile info
- Has authorities collection for role-based access

**Quiz Entity**: Exam definition

- Links to Category (many-to-one)
- Contains title, description, max marks, number of questions
- `active` flag controls visibility to users

**Question Entity**: Quiz question

- Four options (option1-4) with correct answer
- Optional image support
- `givenAnswer` transient field for evaluation

---

## Frontend Implementation

### Directory Structure

```text
src/
├── App.tsx                 # Main router configuration
├── main.tsx               # React entry point
├── index.css              # Global styles + Tailwind
├── vite-env.d.ts          # TypeScript declarations
├── api/
│   └── axios.ts           # Axios instance with interceptors
├── context/
│   └── AuthContext.tsx    # Global authentication state
├── types/
│   └── index.ts           # TypeScript interfaces
├── services/              # API service functions
│   ├── auth.service.ts
│   ├── category.service.ts
│   ├── quiz.service.ts
│   └── question.service.ts
├── hooks/                 # React Query hooks
│   ├── useCategory.ts
│   ├── useQuiz.ts
│   └── useQuestion.ts
├── components/
│   ├── layout/
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   ├── Navbar.tsx     # Top navigation
│   │   ├── Sidebar.tsx    # Side navigation
│   │   └── PageTransition.tsx
│   └── ui/
│       └── Card.tsx       # Reusable card component
├── pages/
│   ├── Home.tsx           # Landing page
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── user/
│   │   ├── UserDashboard.tsx  # User routes
│   │   ├── LoadQuiz.tsx       # Quiz list by category
│   │   ├── Instructions.tsx   # Pre-quiz instructions
│   │   ├── StartQuiz.tsx      # Quiz taking interface
│   │   └── Profile.tsx        # User profile
│   └── admin/
│       ├── Dashboard.tsx      # Admin routes
│       ├── Welcome.tsx
│       ├── categories/
│       │   ├── CategoryList.tsx
│       │   └── AddCategory.tsx
│       ├── quizzes/
│       │   ├── QuizList.tsx
│       │   ├── AddQuiz.tsx
│       │   └── UpdateQuiz.tsx
│       └── questions/
│           ├── ViewQuestions.tsx
│           └── AddQuestion.tsx
└── utils/
    └── index.ts           # Utility functions (cn for classnames)
```

### State Management Strategy

**Global State (React Context)**:

- `AuthContext`: User authentication, login/logout, role checking

**Server State (React Query)**:

- Categories, Quizzes, Questions cached and automatically invalidated
- Optimistic updates with `useQueryClient().invalidateQueries()`

**Local State (useState)**:

- Form inputs, timer, current question index

### Key Frontend Concepts

**Axios Interceptors**: Automatically attach JWT token to requests and handle 401 responses globally

**Protected Routing**: Layout component checks `useAuth()` for authentication status

**Dark Mode**: CSS custom properties with Tailwind's dark mode support

---

## Authentication & Security

### JWT Flow

```text
1. User submits credentials to POST /generate-token
2. Backend validates via AuthenticationManager
3. JwtUtils generates token with username and expiration
4. Token returned in JwtResponse { token: "eyJ..." }
5. Frontend stores token in localStorage
6. All subsequent requests include Authorization: Bearer <token>
7. JwtAuthenticationFilter validates token on each request
8. If valid, sets SecurityContext; if invalid, 401 response
```

### Security Configuration

```java
// Public endpoints (no auth required):
- /generate-token     // Login
- /user/              // Registration
- /h2-console/**      // Dev database console
- /actuator/**        // Health monitoring
- /swagger-ui/**      // API documentation

// Protected endpoints (JWT required):
- All other endpoints require valid JWT
```

### Password Security

- Passwords hashed with **BCryptPasswordEncoder** (10 rounds by default)
- Original passwords never stored or logged

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| POST   | `/generate-token` | Login, returns JWT         |
| GET    | `/current-user`   | Get logged-in user details |
| POST   | `/user/`          | Register new user          |

### Categories

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/category/`     | List all categories     |
| GET    | `/category/{id}` | Get single category     |
| POST   | `/category/`     | Create category (Admin) |
| PUT    | `/category/`     | Update category (Admin) |
| DELETE | `/category/{id}` | Delete category (Admin) |

### Quizzes

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/quiz/`                      | List all quizzes           |
| GET    | `/quiz/{id}`                  | Get single quiz            |
| GET    | `/quiz/category/{cId}`        | Quizzes by category        |
| GET    | `/quiz/active`                | Active quizzes only        |
| GET    | `/quiz/category/active/{cId}` | Active quizzes by category |
| POST   | `/quiz/`                      | Create quiz (Admin)        |
| PUT    | `/quiz/`                      | Update quiz (Admin)        |
| DELETE | `/quiz/{id}`                  | Delete quiz (Admin)        |

### Questions

| Method | Endpoint                   | Description                                   |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | `/question/`               | List all questions                            |
| GET    | `/question/{id}`           | Get single question                           |
| GET    | `/question/quiz/{qId}`     | Questions for quiz (shuffled, answers hidden) |
| GET    | `/question/quiz/all/{qId}` | All questions (Admin, with answers)           |
| POST   | `/question/`               | Create question (Admin)                       |
| PUT    | `/question/`               | Update question (Admin)                       |
| DELETE | `/question/{id}`           | Delete question (Admin)                       |
| POST   | `/question/eval-quiz`      | Evaluate submitted answers                    |

---

## Data Flow

### Quiz Taking Flow

```text
1. User browses categories (GET /category/)
2. Selects category, sees quizzes (GET /quiz/category/active/{cId})
3. Clicks quiz → Instructions page
4. Starts quiz → Questions loaded (GET /question/quiz/{qId})
   - Answers removed server-side
   - Questions shuffled
   - Limited to noOfQuestions
5. User answers questions (stored in local state)
6. Timer expires OR user submits
7. Answers sent to backend (POST /question/eval-quiz)
8. Backend compares with correct answers
9. Results returned: { marksGot, correctAnswers, attempted }
```

### Admin CRUD Flow

```text
1. Admin logs in (POST /generate-token)
2. Creates category (POST /category/)
3. Creates quiz in category (POST /quiz/)
4. Adds questions to quiz (POST /question/)
5. Activates quiz by setting active=true (PUT /quiz/)
6. Quiz now visible to users
```

---

## Deployment

### Docker Configuration

**Multi-stage Dockerfile** (`examserver/Dockerfile`):

1. **Build stage**: Uses `eclipse-temurin:17-jdk-alpine` to compile JAR
2. **Runtime stage**: Uses `eclipse-temurin:17-jre-alpine` (smaller image)
3. Runs as non-root `spring` user for security
4. Includes health check for container orchestration

**Environment Variables**:

| Variable               | Default   | Description                                    |
| ---------------------- | --------- | ---------------------------------------------- |
| `PORT`                 | 8080      | Server port                                    |
| `JWT_SECRET`           | (default) | Secret for JWT signing (change in production!) |
| `JWT_EXPIRATION`       | 36000000  | Token validity (10 hours in ms)                |
| `CORS_ALLOWED_ORIGINS` | localhost | Comma-separated allowed origins                |

### Render.com Deployment

The `render.yaml` configures:

- **Backend**: Docker-based web service with health checks
- **Frontend**: Static site with Vite build

---

## Best Practices Implemented

### Backend

- ✅ Stateless JWT authentication
- ✅ CORS properly configured
- ✅ BCrypt password hashing
- ✅ Service layer abstraction
- ✅ Proper exception handling
- ✅ SLF4J logging
- ✅ OpenAPI documentation
- ✅ Health monitoring endpoints

### Frontend

- ✅ TypeScript for type safety
- ✅ React Query for efficient data fetching
- ✅ Axios interceptors for auth headers
- ✅ Context API for global state
- ✅ Responsive Tailwind design
- ✅ Dark mode support
- ✅ ESLint + Prettier code quality

### DevOps

- ✅ Multi-stage Docker builds
- ✅ Non-root container user
- ✅ Health checks configured
- ✅ Environment-based configuration
- ✅ Cloud-ready deployment (Render.yaml)

---

## Running the Application

### Development

```bash
# Backend (Terminal 1)
cd examserver
mvn spring-boot:run

# Frontend (Terminal 2)
cd examfront
npm install
npm run dev
```

### Production Build

```bash
# Backend
cd examserver
mvn clean package -DskipTests
java -jar target/examserver-0.0.1-SNAPSHOT.jar

# Frontend
cd examfront
npm run build
# Serve dist/ folder with any static server
```

### Docker

```bash
cd examserver
docker-compose up --build
```

---

## Conclusion

The Exam Portal demonstrates a modern, scalable architecture with:

- **Clean separation of concerns** between frontend and backend
- **Secure authentication** using industry-standard JWT
- **Efficient data fetching** with React Query caching
- **Production-ready** Docker containerization
- **Comprehensive API** documented via Swagger

The codebase follows best practices for maintainability, testability, and scalability.
