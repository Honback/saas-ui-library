# ============================================
# Stage 1: Development (with hot reload)
# ============================================
FROM eclipse-temurin:17-jdk-jammy AS development

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:resolve -B

COPY src/ src/

EXPOSE 8080 5005

CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"]

# ============================================
# Stage 2: Build
# ============================================
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:resolve -B

COPY src/ src/
RUN ./mvnw package -DskipTests -B

# ============================================
# Stage 3: Production
# ============================================
FROM eclipse-temurin:17-jre-jammy AS production

WORKDIR /app

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

COPY --from=build /app/target/*.jar app.jar

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
