
import AWS from 'aws-sdk';
import {getAwsS3} from './AwsS3Controller';

const fetchArtistsController = async (callback) => {
  //async function fetchArtistsController(callback) {

  // If AWS Do Not Use, just send back hardcoded data
  if (process.env.REACT_APP_AWS === "DNU") {
    return fakeFetchArtistsController(callback);
  }

  var s3 = getAwsS3();

  // Lets try Promise instead of function callback
  s3.listObjects({ Delimiter: '/' }).promise()
    .then(data => {
      let names = data.CommonPrefixes.map(data => data.Prefix);
      console.log("Returning names - ", JSON.stringify(names));
      callback(names);
      //return names;     //Return is useless since the function already returned !!
    })
    .catch(err => console.log("Failed"));
};

const fakeFetchArtistsController = async (callback) => {
  var names = ["Abhishek/", "Swati/", "Abhishek1/", "Swati1/", "Abhishek2/", "Swati2/"];
  callback(names);
};


export { fetchArtistsController };