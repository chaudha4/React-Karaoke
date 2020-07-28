
import AWS from 'aws-sdk';
import {getAwsS3, BASE_URL, BUCKETNAME} from './AwsS3Controller';

const fetchMp3s = async (artist, callback) => {
  //async function fetchArtistsController(artis, callback) {

  // If AWS Do Not Use, just send back hardcoded data
  if (process.env.REACT_APP_AWS === "DNU") {
    return fakeFetchMp3s(artist, callback);
  }

  var s3 = getAwsS3();

  // Lets try Promise instead of function callback
  s3.listObjects({ Prefix: artist }).promise()
    .then(data => {
      console.log("Received Data - ", JSON.stringify(data));
      let mp3 = data.Contents
        .filter(data => {
          return data.Key.endsWith(".mp3") ? true : false;
        }) //filter
        .map(data => {
          console.log(data);
          let mp3Url = BASE_URL + encodeURIComponent(data.Key);
          let mp3Name = data.Key.split("/")[1];
          let artistName = data.Key.split("/")[0];
          console.log(mp3Url, mp3Name, artistName);
          return {
            url: mp3Url,
            name: mp3Name,
            artist: artistName,
          }
        }); //map      
      console.log("Returning mp3 - ", JSON.stringify(mp3));
      callback(mp3);
    })
    .catch(err => console.log("Failed"));
};

const uploadMp3s = async (artist, file) => {

  var fileName = encodeURIComponent(file.name);
  var filePath = artist + fileName;
  var s3 = getAwsS3();

  var promise = s3.upload({
    Key: filePath,
    Body: file,
    ACL: 'public-read'    
  }).promise();

  promise.then(
    data => {
      console.log("Successfully uploaded %s in folder %s.", fileName, filePath);
    }
  ).catch(err => {
    console.log("Failed to upload %s in folder %s", fileName, filePath);
    console.log(err);
  });  
};

const createArtist = async (artist, callback) => {

  var filePath = encodeURIComponent(artist) + "/";
  var s3 = getAwsS3();

  var promise = s3.upload({
    Key: filePath,
    Body: "",
    ACL: 'public-read'    
  }).promise();

  promise.then(
    data => {
      console.log("Successfully uploaded %s ", filePath);
      callback();
    }
  ).catch(err => {
    console.log("Failed to upload %s ", filePath);
    console.log(err);
  });  
};

const deleteArtist = async (artist) => {

  var filePath = encodeURIComponent(artist) + "/";
  var s3 = getAwsS3();
  const params = {
    Prefix: filePath
  };

  const listedObjects = await s3.listObjectsV2(params).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Delete: { Objects: [] }
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await deleteArtist(artist);
};



const fakeFetchMp3s = async (artist, callback) => {
  let retValue = [{
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Rimjhim%20rimjhim.mp3",
    "name": "Abh-Rimjhim rimjhim.mp3",
    "artist": "Abhishek"
  }, {
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
    "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
    "artist": "Abhishek"
  }, {
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
    "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
    "artist": "Abhishek"
  }, {
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
    "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
    "artist": "Abhishek"
  }, {
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
    "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
    "artist": "Abhishek"                
  }, {
    "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
    "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
    "artist": "Abhishek"
  }];

  if (artist.toLowerCase().startsWith("swati")) {
    retValue = [{
      "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Swati%2FSwati-Mausam%20hai%20Aashiquana.mp3",
      "name": "Swati-Mausam hai Aashiquana.mp3",
      "artist": "Swati"
    }];
  }

  callback(retValue); 
};

export {
  fetchMp3s,
  uploadMp3s, 
  createArtist,
  deleteArtist,
};

/*
Received Data -
  { "IsTruncated": false, "Marker": "", "Contents": [{ "Key": "Abhishek/", "LastModified":
  "2020-07-27T18:36:37.000Z", "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "Size": 0,
  "StorageClass": "STANDARD" }, { "Key": "Abhishek/Abh-Rimjhim rimjhim.mp3",
  "LastModified": "2020-07-27T18:38:01.000Z", "ETag": "\"a1e1743393f7720b8e65e4f0bda86677\"",
  "Size": 7740577, "StorageClass": "STANDARD" },
  { "Key": "Abhishek/Abh-Tujhse Naaraz nahi jindigi.mp3",
  "LastModified": "2020-07-27T18:37:57.000Z",
  "ETag": "\"a771165c7f7c705b1c8285d9ab26ec69\"", "Size": 5503353, "StorageClass": "STANDARD" }],
  "Name": "dusnumbaries-karaoke", "Prefix": "Abhishek/", "MaxKeys": 1000, "CommonPrefixes": [] }
*/