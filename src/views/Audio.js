import React, { useState } from "react";

import DeleteSong from "./DeleteSong";


export default function Audio({ url, name, artist, refresh }) {

    const [deleteSong, setDeleteSong] = useState(false);

    console.log("Entering Audio for %s", name);

    async function onDelete(e) {
        setDeleteSong(true);
        //await model.deleteSong(artist, name);
    }

    async function onCancelCB(e) {
        setDeleteSong(false);
    }


    function renderMe() {

        if (deleteSong) {
            return (<DeleteSong artist={artist}
                song={name} onCancel={onCancelCB}
                refresh={refresh} />);
        }
        

        return (
            <div className='audioplayer'>
                <div className='audioplayer--title'>
                    <p className="center">{name}</p>

                </div>

                <audio controls preload="auto" src={url} >
                    Your browser does not support the <code>audio</code> element.</audio>


                <button className="button center" type="button" onClick={onDelete} >
                    Delete</button>

            </div>
        );

    }

    return renderMe();

}