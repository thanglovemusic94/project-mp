FROM openjdk:11

WORKDIR /opt/pii-backend
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} pii-backend.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "pii-backend.jar"]
