import React, { useState, useEffect } from "react";

import Audio from './Audio';
import UploadSong from "./UploadSong";
import DeleteUser from "./DeleteUser";

import * as model from './../models/ArtistModel';

export default function Artist({ name, refresh }) {

    console.log("Entering Artist for %s", name);

    const [mp3s, setMp3s] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [deleteArtist, setDeleteArtist] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setMp3s(await model.getMp3s(name));
        };
        fetchData();
    }, [name]); // Only process if name changes

    function handleUpload(e) {
        setShowUpload(true);
    }

    function onCancel(e) {
        setDeleteArtist(false);
    }

    function handleDelete(e) {
        setDeleteArtist(true);
    }

    // After successfull creation, refresh songs.
    async function refreshSongs() {
        setMp3s(await model.getMp3s(name));
    }

    function renderArtist() {
        return (

            <div className="artistcontainer">
<div className="boxshadow center"><h2>{name}</h2>

                <div className="audiocontainer">
                    {mp3s.map(a => {
                        return (<Audio key={`audio-${a.name}`}
                            url={a.url}
                            name={a.name}
                            artist={name}
                            refresh={refreshSongs} />)
                    })}
                </div>

                
                    
                    <button className="button" onClick={handleUpload}>
                        Upload Song
                    </button>
                    <button className="button" onClick={handleDelete}>
                        Delete Singer
                    </button>

                
                </div>
            </div>
        );
    }

    // Render based on what needs to be shown.
    if (showUpload) {
        return (<UploadSong artist={name} refreshSongs={refreshSongs}
            setShowUpload={setShowUpload} />);
    } else if (deleteArtist) {
        return (<DeleteUser artist={name} onCancel={onCancel} refresh={refresh} />);
    } else {
        return renderArtist();
    }


}