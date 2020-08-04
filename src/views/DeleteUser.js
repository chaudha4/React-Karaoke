import React, { useState } from "react";

import * as model from './../models/ArtistModel';

export default function DeleteUser({ artist, onCancel, refresh }) {

    async function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.
        await model.deleteOldArtist(artist);
        refresh();  // reload the page
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