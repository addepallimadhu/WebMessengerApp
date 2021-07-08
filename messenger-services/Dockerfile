FROM maven:3.5-jdk-8-alpine as build
COPY . .
RUN mvn -B -DskipTests install

FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=build ./target/messenger-0.0.1-SNAPSHOT.jar ./messenger-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "messenger-0.0.1-SNAPSHOT.jar"]


