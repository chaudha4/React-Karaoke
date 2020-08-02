import {Dropbox} from 'dropbox';


const DBX = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_TOKEN });

const getDropbox = () => {
 
    return DBX;
  
  };

  
  
export {getDropbox};