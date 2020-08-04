import React, {useState, useEffect} from "react";

import * as model from './../models/ArtistModel';

export default function Audio({url, name, artist, trigger}) {

    const [checked, setChecked] = useState(false);

    console.log("Entering Audio for %s", name);

    useEffect( () => {
        async function DoAsync() {
            console.log("Audio::useEffect Recived a trigger from Parent ", trigger);
            if(checked) {
                await model.deleteSong(artist, name);
            }
            //setMp3s(await model.getMp3s(name));
        };
        DoAsync();
    }, [trigger]); // Only process if trigger changed

    function onChange(e) {
        //console.log(e.target);
        setChecked(!checked);
    }    

    return (
        <div className='audioplayer'>
            <div className='audioplayer--title'>
                <p className="center">{name}</p>
                <input type='checkbox' checked={checked} onChange={onChange} />
            </div>            
            
            <audio controls preload="auto" src={url}>
                Your browser does not support the <code>audio</code> element.
            </audio>
        </div>
    );

}