import React, {useState, useEffect} from "react";

export default function Audio({url, name}) {

    console.log("Entering Audio for %s", name);

    return (
        <div className='audioplayer'>
            <p>{name}</p>
            <audio controls preload="auto" src={url}>
                Your browser does not support the <code>audio</code> element.
            </audio>
        </div>
    );

}