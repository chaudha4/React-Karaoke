import React, {useState, useEffect} from "react";

import {fetchMp3s} from '../controllers/ArtistController';
import {BASE_URL} from '../controllers/AwsS3Controller';
import Audio from './Audio';
import FileDialog from "./FileDialog";

export default function Artist({name}) {

    console.log("Entering Artist for %s", name);

    const [mp3s, setMp3s] = useState([]);
    const [showUpload, setShowUpload] = useState(false);

    useEffect( () => {
        fetchMp3s( name, (a) =>  setMp3s(a) );
    }, [name]); // Only process if name changes

    function handleUpload(e) {
        setShowUpload(true);
    }

    function renderArtist() {
        return (

            <div className="artistcontainer">
                <div className="boxshadow center">
                    <h2>{name.slice(0, -1)}</h2>
                    <button className="button" onClick={handleUpload}>
                        Add Song
                    </button>
                </div>

                <div className="audiocontainer">
                    {mp3s.map(a => {
                        return (<Audio key={a.name} url={a.url} name={a.name} />)
                    })}
                </div>
            </div>
        );
    }

    if (showUpload) {
        return (<FileDialog artist={name} setShowUpload={setShowUpload}/>);
    }

    return renderArtist();

}