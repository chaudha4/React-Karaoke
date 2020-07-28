import React, {useState, useEffect} from "react";

import {createArtist, deleteArtist} from '../controllers/ArtistController';
import { Redirect } from "react-router-dom";

export default function Admin({artists}) {

    const [name, setName] = useState();
    const [redirect, setRedirect] = useState();

    function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.
        console.log("Going to Add - %s");
        createArtist(name, afterCreate);
        //deleteArtist(name)
    }

    // After successfull creation, navigate to the new user.
    function afterCreate() {
        setRedirect("/" + name);
    }    

    function onChange(e) {
        setName(e.target.value);
    }
    
    function renderMe() {

        if(redirect) {
            return <Redirect to={redirect} />
        }

        return (
        <div className='boxshadow'>
            <h2 className="center">Manage Artists</h2>
                <form className="input center" onSubmit={onFormSubmit}>
                    <label>
                        <small>Name:  </small>
                        <input type="text" className="input" 
                            value={name}  placeholder="First name"
                            onChange={onChange} />
                    </label>

                    <button className="button" type="submit">Add</button>
                </form>

        </div>
        );
    }

    return renderMe();

}