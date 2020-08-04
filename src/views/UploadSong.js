import React, { useState } from "react";

import Loading from './Loading';

import * as model from './../models/ArtistModel';

export default function UploadSong({ artist, refreshSongs, setShowUpload }) {

    const [file, setFile] = useState({});   // { name: "test.mp3", lastModified: " }
    const [uploading, setUploading] = useState(false);


    async function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.
        if (file.name && ( file.name.endsWith(".mp3") || file.name.endsWith(".ogg"))) {
            console.log("FileDialog::Going to Upload File - %o", file);
            setUploading(true);
            await model.pushMp3s(artist, file);
            setShowUpload(false);   // Callback to hide this dialog from parent
            refreshSongs();
            setUploading(false);
        } else {
            console.log("File must be mp3 File - %o", file);
        }
    }

    function onChange(e) {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    function onCancel(e) {
        setShowUpload(false);
    }


    function renderDialog() {

        if (uploading) {
            return (
                <Loading />
            );
        }

        return (
            <div className="boxshadow">
                <h2 className="center">{artist}</h2>

                <form className="input center" onSubmit={onFormSubmit}>
                    <input className="input" type="file" accept="audio/*"
                        onChange={onChange} />
                    <div className="center">
                        <button className="button center" type="submit"
                            disabled={!file.name}>
                            Upload
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