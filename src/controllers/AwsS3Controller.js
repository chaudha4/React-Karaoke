import AWS from 'aws-sdk';

const BUCKETNAME = process.env.REACT_APP_BUCKETNAME;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAwsS3 = () => {
 
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_ID,
    });
  
    // Create a new service object
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: BUCKETNAME}
    });    
  
  };

  
  
  export {getAwsS3, BASE_URL, BUCKETNAME};