import React, {useState, useEffect} from "react";

import {fetchMp3s} from '../controllers/ArtistController';
import Audio from './Audio';
import UploadSong from "./UploadSong";
import DeleteUser from "./DeleteUser";

export default function Artist({name}) {

    console.log("Entering Artist for %s", name);

    const [mp3s, setMp3s] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [deleteArtist, setDeleteArtist] = useState(false);

    useEffect( () => {
        fetchMp3s( name, (a) =>  setMp3s(a) );
    }, [name]); // Only process if name changes

    function handleUpload(e) {
        setShowUpload(true);
    }

    function handleDelete(e) {
        setDeleteArtist(true);
    }

    // After successfull creation, refresh songs.
    async function refreshSongs() {
        await fetchMp3s( name, (a) =>  setMp3s(a) );
        //setRedirect("/" + name);  // Go to newly added user.
    }    

    function renderArtist() {
        return (

            <div className="artistcontainer">
                <div className="boxshadow center">
                    <h2>{name}</h2>
                    <button className="button" onClick={handleUpload}>
                        Add Song
                    </button>
                    <button className="button" onClick={handleDelete}>
                        Delete User
                    </button>                    
                </div>

                <div className="audiocontainer">
                    {mp3s.map(a => {
                        return (<Audio key={`audio-${a.name}`} url={a.url} name={a.name} />)
                    })}
                </div>
            </div>
        );
    }

    // Render based on what needs to be shown.
    if (showUpload) {
        return (<UploadSong artist={name} refreshSongs={refreshSongs}
            setShowUpload={setShowUpload} />);
    } else if (deleteArtist) {
        return (<DeleteUser artist={name} />);
    } else {
        return renderArtist();    
    }


}