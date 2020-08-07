import React , { useState } from "react";

import * as model from '../models/ArtistModel';
import Loading from './Loading';

export default function DeleteSong({ artist, song, onCancel, refresh }) {

    const [spin, setSpin] = useState(false);

    async function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.

        async function delSong() {
            setSpin(true);
            await model.deleteSong(artist, song);
            refresh();  // reload the page
            setSpin(false);
        };        
        
        delSong();
    }

    function renderDialog() {
        if (spin) {
            return (<Loading />);
        }        

        return (
            <div className="boxshadow">
                <h2 className="center">Delete {song} ??</h2>

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