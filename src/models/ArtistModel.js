
import {
    fetchArtistsFromDB,
    fetchMp3sFromDB,
    uploadMp3sToDB,
    createArtistInDB,
    deleteArtistInDB,
} from "./Dropbox/DropboxModel";

import {
    fetchArtistsFromS3,
    fetchMp3sFromS3,
    uploadMp3sToS3,
    createArtistInS3,
    deleteArtistInS3,
} from "./S3/S3Model";

import {
    fetchArtistsFromLocal,
    fetchMp3sFromLocal,
    createArtistLocal,
} from "./LocalStorage/LocalModel"


const fetchArtists = async () => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX': ;
            return await fetchArtistsFromDB();
            break;
        case 'S3':
            return await fetchArtistsFromS3();;
            break;
        default:
            console.log("Error - No Model Found");
            return fetchArtistsFromLocal();
    }
};

const getMp3s = async (artist) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            return await fetchMp3sFromDB(artist);
            break;
        case 'S3':
            return await fetchMp3sFromS3(artist);
            break;
        default:
            console.log("Error - No Model Found");
            return fetchMp3sFromLocal(artist);
    }

};

const pushMp3s = async (artist, file) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            await uploadMp3sToDB(artist, file);
            break;
        case 'S3':
            await uploadMp3sToS3(artist, file);
            break;
        default:
            console.log("Error - No Model Found");
    }

};

const createNewArtist = async (artist, callback) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            createArtistInDB(artist, callback);
            break;
        case 'S3':
            createArtistInS3(artist, callback);
            break;
        default:
            console.log("Error - No Model Found");
            callback();
    }
}

const deleteOldArtist = async (artist) => {
    switch (process.env.REACT_APP_MODEL) {
        case 'DROPBOX':
            await deleteArtistInDB(artist);
            break;
        case 'S3':
            await deleteArtistInS3(artist);
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

