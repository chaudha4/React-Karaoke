import { Dropbox } from 'dropbox';


const DBX = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_TOKEN });

const getDropbox = () => {

  return DBX;

};


const fetchArtistsFromDB = async () => {

  var dbx = getDropbox();

  let names = [];

  await dbx.filesListFolder({ path: '' })
    .then(data => {
      console.log(data);
      names = data.entries.map(d => d.name);
      console.log("fetchArtistsFromDB:: Returning names - ", JSON.stringify(names));
    })
    .catch(err => console.log("Failed"))

  return names.sort();

};

const fetchMp3sFromDB = async (artist) => {

  let mp3s = [];

  var dbx = getDropbox();

  let compareForSort = (a, b) => {
    let aa = a.name.toUpperCase();
    let bb = b.name.toUpperCase();
    if (aa > bb) {
      return 1;
    } else if (aa < bb) {
      return -1;
    }
    return 0;
  }

  await dbx.filesListFolder({ path: `/${artist}` })
    .then(async (data) => {
      console.log(data);

      var promises = [];
      data.entries.forEach(d => {
        promises.push(dbx.filesGetTemporaryLink({ path: d.path_display }));
      });

      await Promise.all(promises).then(values => {
        mp3s = values.map(v => {
          return {
            url: v.link,
            name: v.metadata.name,
            artist: artist,
          }
        })
      })


    })
    .catch(err => console.log("Failed"));

  console.log("fetchMp3sFromDB::Returning mp3 - ", JSON.stringify(mp3s));
  return mp3s.sort(compareForSort);
};

const uploadMp3sToDB = async (artist, file) => {

  var dbx = getDropbox();

  // Await ensures we wait till promises are fulfilled. Callback would be another 
  // way to do it. See createNewArtist below.
  await dbx.filesUpload({ path: `/${artist}/${file.name}`, contents: file })
    .then(data => {
      console.log("uploadMp3sToDb::Uploaded %s", file.name);
      console.log(data);
    })
    .catch(err => {
      console.log("uploadMp3sToDb::Failed to upload");
      console.log(err);
    });
};

const createArtistInDB = async (artist, callback) => {

  var filePath = "/" + artist;
  var dbx = getDropbox();

  // Not using await. Instead We use callback when done.
  dbx.filesCreateFolderV2({path: filePath})
  .then(
    data => {
      console.log("createNewArtist::Successfully uploaded %s ", filePath);
      callback();
    }
  ).catch(err => {
    console.log("createNewArtist::Failed to upload %s ", filePath);
    console.log(err);
  });  
};

const deleteArtistInDB = async (artist) => {

  const filePath = "/" + artist;
  const dbx = getDropbox();

  await dbx.filesDeleteV2({path: filePath})
  .then( d => {
    console.log("deleteArtistInDB::Successfully deleted %s ", filePath);
  }).catch ( err => {
    console.log("deleteArtistInDB::Failed to delete %s ", filePath);
    console.log(err);
  });

};

const deleteSong = async (artist, song) => {

  const filePath = "/" + artist + "/" + song;
  const dbx = getDropbox();

  await dbx.filesDeleteV2({path: filePath})
  .then( d => {
    console.log("deleteArtistInDB::Successfully deleted %s ", filePath);
  }).catch ( err => {
    console.log("deleteArtistInDB::Failed to delete %s ", filePath);
    console.log(err);
  });

};

export {
  fetchArtistsFromDB,
  fetchMp3sFromDB,
  uploadMp3sToDB,
  createArtistInDB,
  deleteArtistInDB,
  deleteSong,
};


