import AWS from 'aws-sdk';

const BUCKETNAME = process.env.REACT_APP_BUCKETNAME;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAwsS3 = () => {

    console.log("AWS S3 Bucket Name in %s mode", process.env.REACT_APP_BUCKETNAME);
    console.log("AWS S3 Bucket url ", process.env.REACT_APP_BASE_URL);
    console.log("AWS S3 Bucket token", process.env.REACT_APP_ID);


    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_ID,
    });

    // Create a new service object
    return new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: BUCKETNAME }
    });

};

const fetchArtistsFromS3 = async () => {

    var s3 = getAwsS3();

    let names = [];

    await s3.listObjects({ Delimiter: '/' }).promise()
        .then(data => {
            names = data.CommonPrefixes.map(data => {
                let name = decodeURIComponent(data.Prefix);
                return name.slice(0, -1)
            });
            console.log("fetchArtistsFromS3::Returning names - ", JSON.stringify(names));
            //callback(names);
            return names;
        })
        .catch(err => console.log("Failed"));

    return names
};

const fetchMp3sFromS3 = async (artist) => {

    var s3 = getAwsS3();
    let mp3 = [];

    let prefix = encodeURIComponent(artist);

    await s3.listObjects({ Prefix: prefix }).promise()
        .then(data => {
            console.log("fetchMp3sFromS3::Received Data - ", JSON.stringify(data));
            mp3 = data.Contents
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


        })
        .catch(err => console.log("Failed"));

    console.log("fetchMp3sFromS3::Returning mp3 - ", JSON.stringify(mp3));
    return mp3;
};

const uploadMp3sToS3 = async (artist, file) => {

    var fileName = encodeURIComponent(file.name);
    var filePath = encodeURIComponent(artist) + "/" + file.name;
    //var filePath = encodeURIComponent(artist) + "/";
    var s3 = getAwsS3();

    var promise = s3.upload({
        Key: filePath,
        Body: file,
        ACL: 'public-read'
    }).promise();

    await promise.then(
        data => {
            console.log("Successfully uploaded %s in folder %s.", fileName, filePath);
        }
    ).catch(err => {
        console.log("Failed to upload %s in folder %s", fileName, filePath);
        console.log(err);
    });
};

const createArtistInS3 = async (artist, callback) => {

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

const deleteArtistInS3 = async (artist) => {

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
  
    if (listedObjects.IsTruncated) await deleteArtistInS3(artist);
  };


  const deleteSong = async (artist, song) => {

    const filePath = encodeURIComponent(artist) + "/" + encodeURIComponent(song);

    console.log("deleteSong:: Deleting %s", filePath)
    var s3 = getAwsS3();
    const params = {
        Key: filePath
    };
    await s3.deleteObject(params).promise()
    .then( d => {
      console.log("deleteSong::Successfully deleted %s ", filePath);
    }).catch ( err => {
      console.log("deleteSong::Failed to delete %s ", filePath);
      console.log(err);
    });
  
  };  

export {
    fetchArtistsFromS3,
    fetchMp3sFromS3,
    uploadMp3sToS3,
    createArtistInS3,
    deleteArtistInS3,
    deleteSong,
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