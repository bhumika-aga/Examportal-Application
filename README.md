# Examportal-Application

Built using: SpringBoot, MySQL, JWT Auth Tokens, Angular, Github

Online exam app: Teachers can conduct/evaluate MCQ exams, students can attempt and view scores.

• Implemented JWT authentication to ensure secure access to the platform.

• Made Admin portal for test/quiz management and user portal for students to take timed tests.

• Increased efficiency by 30% compared to traditional exam-taking methods.

## Project Structure

- **examfront/** - Angular frontend application (port 4200)
- **examserver/** - Spring Boot backend application (port 8080)

## Prerequisites

- Node.js 18+ (with OpenSSL legacy provider support)
- Java 17+
- Maven 3.6+
- No database installation required (uses embedded H2 database)

## Setup Instructions

### Backend (Spring Boot)

1. Install Maven using SDKMAN (if not already installed):

   ```bash
   curl -s https://get.sdkman.io | bash
   source ~/.sdkman/bin/sdkman-init.sh
   sdk install maven
   ```

2. Navigate to the backend directory:

   ```bash
   cd examserver
   ```

3. Build the project:

   ```bash
   mvn clean compile
   ```

4. Database configuration is already set up for H2 in-memory database (no manual configuration needed)

5. Run the application:

   ```bash
   mvn spring-boot:run
   ```

### Frontend (Angular)

1. Navigate to the frontend directory:

   ```bash
   cd examfront
   ```

2. Install dependencies (using legacy peer deps for compatibility):

   ```bash
   npm install --legacy-peer-deps
   ```

3. Build the project:

   ```bash
   NODE_OPTIONS="--openssl-legacy-provider" npm run build
   ```

4. Start the development server:

   ```bash
   NODE_OPTIONS="--openssl-legacy-provider" npm start
   ```

## Running the Application

1. Start the backend server (runs on <http://localhost:8080>)
2. Start the frontend server (runs on <http://localhost:4200>)
3. Access the application at <http://localhost:4200>
4. Access H2 database console at <http://localhost:8080/h2-console> (for development/debugging)

## Known Issues & Fixes Applied

### Frontend Issues Fixed

- **Node.js Compatibility**: Removed invalid Node/npm version dependencies from package.json
- **Dependency Conflicts**: Used `--legacy-peer-deps` flag for npm installation
- **OpenSSL Compatibility**: Added `NODE_OPTIONS="--openssl-legacy-provider"` for Node 18+ compatibility

### Backend Issues Fixed

- **Maven Installation**: Installed Maven via SDKMAN for build support
- **Build Configuration**: Fixed Maven wrapper permissions and build process
- **Spring Boot 3.x Migration**: Updated from Spring Boot 2.7.18 to 3.4.8
- **Database Migration**: Replaced MySQL with embedded H2 database
- **Dependencies Updated**: Updated JWT library and Spring Security configuration

## Database Setup

No manual database setup required! The application now uses an embedded H2 in-memory database that is automatically configured and initialized when the application starts.

### H2 Database Console

You can access the H2 database console at <http://localhost:8080/h2-console> when the application is running:

- **JDBC URL**: `jdbc:h2:mem:examportal`
- **Username**: `sa`
- **Password**: `password`

## Technologies Used

- **Frontend**: Angular 11, Angular Material, Bootstrap
- **Backend**: Spring Boot 3.4.8, Spring Security, Spring Data JPA
- **Database**: H2 Database (embedded, in-memory)
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tools**: Maven, npm

## Recent Upgrades

- ✅ **Spring Boot**: Upgraded from 2.7.18 to 3.4.8
- ✅ **Database**: Migrated from MySQL to H2 embedded database
- ✅ **Dependencies**: Updated JWT library to version 0.12.6
- ✅ **Security**: Updated Spring Security configuration for Spring Boot 3.x
- ✅ **JPA**: Migrated from `javax.persistence.*` to `jakarta.persistence.*`
