FROM maven:3.9.2-eclipse-temurin-17 AS build

COPY . .

RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip

EXPOSE 8001

ENTRYPOINT ["java", "-jar", "./target/msvc-usuarios-0.0.1-SNAPSHOT.jar"]