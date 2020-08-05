import React from "react";
import ReactLoading from 'react-loading';

export default function loading() {

    console.log("Entering Loading");

    return (
        <div className="loading">
            <ReactLoading type="spin"
            color="blue" 
            height="20%"
            width="20%" />
        </div>
    );

}