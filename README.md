# WebMessengerApp

A browser based messaging application using Google Authentication

## Sample Deployed Application

[Simple Web Messenger](https://simplewebmessenger.herokuapp.com/)

## Instructions to run and develop on Local desktop

1. Install

- Adopt Open JDK
- Posgres Db Server
- Node js
- Yarn

2. For Google Auth - Register application from Google API and replace in Messenger.js
   `const clientId = "xxxxx-xxxxxxxxxxxx.apps.googleusercontent.com"`
3. Create the schema messenger in PostGres DB
4. Update DB password in application.properties to match Password in DB
5. Build jar file from messenger-services folder using mvn install -DSkipTests command.
6. Then run the jar file using `java -jar <messenger jar file name>`. This should launch the service on port 8080
7. Now go to messenger-ui folder
8. Run `yarn install` (Run `yarn config strict-ssl false` if getting any security errors and if any network timeouts `yarn install --network-timeout 100000`)
9. Run `yarn start`, this will launch the application on port 3000 and any other port if it is not available

## Instructions for Docker Compose locally

1. Update the Postgres password in Docker Compose file
2. Run docker-compose up. It will bring up the application on port 3003

## Deploy to AWS Elastic Bean Stalk

1. Zip all contents exluding the parent folder and upload it to you Bean stalk application
2. For EC2 Use a t2 medium or better configuration
3. Application will be accessible from the EBS link available in the AWS console
