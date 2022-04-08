FROM openjdk:11

WORKDIR /opt/reading-m-backend
EXPOSE 8080

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} reading-m-backend.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=stg", "reading-m-backend.jar"]
