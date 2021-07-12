# WebMessengerApp
A browser based messaging application using Google Authentication

Instructions to run:
(1) Local desktop -

Pre-requsites:
Adopt Open JDK
Posgres Db Server
Node js
Yarn

Create the schema messenger in PostGres DB
Update DB password in application.properties to match Password in DB
Build jar file from messenger-services folder using mvn install -DSkipTests command. 
Then run the jar file using java -jar <messenger jar file name>. This should lauch the service on port 8080

Now go to messenger-ui folder
Run yarn install (Run yarn config strict-ssl false if getting any security errors)
Run yarn start, this will launch the application on port 3000 and any other port if it is not available

(2) Locally using Docker for Desktop
Update the Postgres password in Docker Compose file
Run docker-compose up. It will bring up the application on port 3003

(3) Deploy to AWS Elastic Bean Stalk
Zip all contents exluding the parent folder and upload it to you Bean stalk application
For EC2 Use a t2 medium or better configuration 
Application will be accessible from the EBS link available in the AWS console
