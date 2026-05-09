# ================================
# Stage 1: Build
# ================================
FROM maven:3.9-eclipse-temurin-17-alpine AS builder

WORKDIR /app

# Resolve dependencies as a cached layer before copying source
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src src

RUN mvn clean package -DskipTests -B

# ================================
# Stage 2: Extract layers
# ================================
FROM eclipse-temurin:17-jre-alpine AS extractor

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

RUN java -Djarmode=layertools -jar app.jar extract --destination extracted

# ================================
# Stage 3: Runtime
# ================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

# Copy layers in dependency-change order (least → most volatile)
COPY --from=extractor /app/extracted/dependencies ./
COPY --from=extractor /app/extracted/spring-boot-loader ./
COPY --from=extractor /app/extracted/snapshot-dependencies ./
COPY --from=extractor /app/extracted/application ./

RUN chown -R spring:spring /app

USER spring

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \
    "-Xmx384m", \
    "-Xms256m", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "org.springframework.boot.loader.launch.JarLauncher"]
