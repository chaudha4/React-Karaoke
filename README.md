# Welcome

This is the repository for a Karaoke app designed to store your karaoke music in cloud and share it with your friends. It is developed with React and is designed to be hosted on Amazon S3.

## Project Setup

Please visit [setup page](./REACT.md) to see how the project is setup. 

## Building and running

There are some addiotnal changes that you need to do before you can run this app.

## Set up AWS S3 bucket

Please signup with Amazon and setup a S3 bucket. Charges will apply unless you have a free tier account with Amazon.

## Update .env

Please provide your own credentials in `.env` that is used by [AwsS3Controller](src/controllers/AwsS3Controller.js.js) to access your AWS S3 bucket.

## Test

Test locally using `npm start` and if things look fine, you can now host this application in AWS S3.

## Hosting

TBD