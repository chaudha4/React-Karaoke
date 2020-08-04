
import * as db from "./Dropbox/DropboxModel";
import * as s3 from "./S3/S3Model";
import * as local from "./LocalStorage/LocalModel" 

const fetchArtists = async () => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX': ;
            return await db.fetchArtistsFromDB();
        case 'S3':
            return await s3.fetchArtistsFromS3();;
        default:
            console.log("Error - No Model Found");
            return local.fetchArtistsFromLocal();
    }
};

const getMp3s = async (artist) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            return await db.fetchMp3sFromDB(artist);
        case 'S3':
            return await s3.fetchMp3sFromS3(artist);
        default:
            console.log("Error - No Model Found");
            return local.fetchMp3sFromLocal(artist);
    }

};

const pushMp3s = async (artist, file) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            await db.uploadMp3sToDB(artist, file);
            break;
        case 'S3':
            await s3.uploadMp3sToS3(artist, file);
            break;
        default:
            console.log("Error - No Model Found");
    }

};

const createNewArtist = async (artist, callback) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            db.createArtistInDB(artist, callback);
            break;
        case 'S3':
            s3.createArtistInS3(artist, callback);
            break;
        default:
            console.log("Error - No Model Found");
            callback();
    }
}

const deleteOldArtist = async (artist) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            await db.deleteArtistInDB(artist);
            break;
        case 'S3':
            await s3.deleteArtistInS3(artist);
            break;
        default:
            console.log("Error - No Model Found");
            
    }
}

export {
    fetchArtists, 
    getMp3s,
    pushMp3s,
    createNewArtist,
    deleteOldArtist,
};

