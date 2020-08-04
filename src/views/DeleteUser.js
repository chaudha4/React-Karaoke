import React, { useState } from "react";
import { deleteArtist } from '../controllers/ArtistController';

export default function DeleteUser({ artist }) {

    async function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.
        deleteArtist(artist);
    }

    function onCancel(e) {
        //setShowUpload(false);
    }


    function renderDialog() {

        return (
            <div className="boxshadow">
                <h2 className="center">Delete {artist} ??</h2>

                <form className="input center" onSubmit={onFormSubmit}>
                    <div className="center">
                        <button className="button center" type="submit" >
                            Delete
                        </button>
                        <button className="button center" type="button"
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>


            </div>
        );
    }

    return renderDialog();

}