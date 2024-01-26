FROM maven:3.9.2-eclipse-temurin-17 AS build

COPY . .

RUN ./mvnw clean package -DskipTests



FROM openjdk:17.0.2-slim

COPY --from=build /target/app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8001
ENTRYPOINT ["java", "-jar", "app.jar"]