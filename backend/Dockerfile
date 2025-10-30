FROM eclipse-temurin:23-jdk AS build
WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:23-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
