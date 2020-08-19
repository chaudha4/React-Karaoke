[![Netlify Status](https://api.netlify.com/api/v1/badges/4334fad3-aace-4bc6-8b0f-29638848a36b/deploy-status)](https://app.netlify.com/sites/adoring-davinci-39e580/deploys)

[![Launch App](./public/favicon.png)](https://adoring-davinci-39e580.netlify.app)

# Welcome

This is the repository for a Karaoke app designed to store your karaoke music in cloud and share it with your friends. It is developed with React, therefore, is a static website that can be hosted anywhere including Amazon S3. The media data is served from Dropbox or S3 (based on setting in .env)

## Project Setup

Please visit [setup page](./REACT.md) to see how the project is setup. You can choose to use AWS S3 or Dropbox or Local (for testing).

## Set up AWS S3 bucket (Option 1)

Please signup with Amazon and setup a S3 bucket. Charges will apply unless you have a free tier account with Amazon.

### Provide AWS credentials

Please provide your own credentials (either in `.env` or export it as environment variables) that is used by [AwsS3Controller](src/controllers/AwsS3Controller.js.js) to access your AWS S3 bucket.

## DropBox (Option 2)
You can also use dropbox to store mp3. You need to signup and get API token. You can then add the token in .env file or export it so that it is available to app at run time.

## Test

Test locally using `npm start` and if things look fine, you can now host this application in AWS S3.

# Setting up the environment

This step depends on your build environment. If you prefer to use .env files, you can create one at root. See an example below. Please update (or remove) each tag with you account information. Please note that the values shown below won't work - they are just an illustration.

```
# Can be DROPBOX or S3 or LOCAL
REACT_APP_MODEL = '<<DROPBOX>>'

# S3 Specific - Only if using S3
REACT_APP_BUCKETNAME = '<<karaoke>>'
REACT_APP_BASE_URL = '<<https://karaoke.s3.amazonaws.com/>>'
REACT_APP_ID = '<<abcd>>'

# Dropbox Specific - only if using dropbox.
REACT_APP_DROPBOX_TOKEN='<<abcd>>'
```
