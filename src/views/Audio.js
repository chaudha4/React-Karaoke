import React, {useState, useEffect} from "react";

import * as model from './../models/ArtistModel';

export default function Audio({url, name, artist, trigger}) {

    const [checked, setChecked] = useState(false);

    console.log("Entering Audio for %s", name);

    useEffect( () => {
        console.log("Audio::useEffect Received a trigger from Parent ", trigger, checked);
        async function DoAsync() {
            console.log("Audio::useEffect Deleting Song %s", name);
            if(checked) {
                await model.deleteSong(artist, name);
                setChecked(false);
            }
            //setMp3s(await model.getMp3s(name));
        };
        DoAsync();
    }, [trigger, artist, checked, name]); // Only process if trigger changed

    useEffect( () => {
        console.log("");
    }, []); // Only process if trigger changed    

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