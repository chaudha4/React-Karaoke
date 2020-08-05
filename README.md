# Welcome

This is the repository for a Karaoke app designed to store your karaoke music in cloud and share it with your friends. It is developed with React, therefore, is a static website that can be hosted anywhere including Amazon S3. The media data is served from Dropbox or S3 (based on setting in .env)

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

# Setting up the .env

Please create a .env file at root. See an example below. Please update (or remove) each tag with you account information. Please note that the values shown below won't work - they are just an illustration.

```
# Can be DROPBOX or S3 or LOCAL
REACT_APP_MODEL = 'DROPBOX'

# S3 Specific - Only if using S3
REACT_APP_BUCKETNAME = 'karaoke'
REACT_APP_BASE_URL = 'https://karaoke.s3.amazonaws.com/'
REACT_APP_ID = 'abcd'

# Dropbox Specific - only if using dropbox.
REACT_APP_DROPBOX_TOKEN='abcd'
```