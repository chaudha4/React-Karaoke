
import {
  fetchArtists,
  createNewArtist,
  deleteOldArtist,
  getMp3s,
  pushMp3s,
}
  from './../models/ArtistModel';

const getArtists = async (callback) => {
  let artists = await fetchArtists();
  callback(artists);
};

const fetchMp3s = async (artist, callback) => {
  let mp3s = await getMp3s(artist);
  callback(mp3s);
};

const uploadMp3s = async (artist, file) => {
  await pushMp3s(artist, file);
};

const createArtist = async (artist, callback) => {
  createNewArtist(artist, callback);
}

const deleteArtist = async (artist) => {
  await deleteOldArtist(artist);
};


export {
  fetchMp3s,
  uploadMp3s,
  createArtist,
  deleteArtist,
  getArtists,
};

