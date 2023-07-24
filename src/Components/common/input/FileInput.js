import React, { useState } from "react";
import "./styles.css";

function FileInput({ accept, id, fileHandleFuc, text }) {
    const [fileSelected, setFileSelected] = useState(false)

    const onChange = (e) => {
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name)
        fileHandleFuc(e.target.files[0])
    }
    return (
        <>
            <label htmlFor={id} className={`custom-input ${!fileSelected ?
                "label-input" : "active"}`}>
                {fileSelected ? `The File ${fileSelected} was Selected` :
                    text}
            </label>
            <input type="file" accept={accept} id={id}
                style={{ display: 'none' }} onChange={onChange} />
        </>
    );
}

export default FileInput;


