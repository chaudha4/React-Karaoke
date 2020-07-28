import React, {useState} from "react";
import {uploadMp3s} from '../controllers/ArtistController';

export default function FileDialog({artist, setShowUpload}) {

    const [file, setFile] = useState({});   // { name: "test.mp3", lastModified: " }

    function onFormSubmit(e) {
        e.preventDefault(); //  prevent a browser reload/refresh.
        console.log("Going to Upload File - %o", file);
        uploadMp3s(artist, file);
        setShowUpload(false);   // Callback to hide this dialog from parent
    }

    function onChange(e) {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    function onCancel(e) {
        setShowUpload(false);
    }    


    function renderDialog() {
        return (
            <div className="boxshadow">
                <h2 className="center">{artist.slice(0, -1)}</h2>

                <form className="input center" onSubmit={onFormSubmit}>
                    <input className="input" type="file" onChange={onChange} />
                    <div className="center">
                        <button className="button center" type="submit">
                            Upload
                        </button>
                        <button className="button center" type="button" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>


            </div>            
        );
    }

    return renderDialog();

}