# build Spring APP
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package

#start Docker with jar file from build
FROM openjdk:8-jdk-alpine
COPY --from=MAVEN_BUILD /build/target/family_API-0.0.1.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

#zuerst in API folder ausführen mvnw package

#FROM openjdk:8-jdk-alpine
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]