import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile]=useState(null);
    const [fileName, setFileName]=useState("No Image Selected");
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(file){
            try{

            }catch(e){
                alert("Unable to upload to Pinata");
            }
        }
    }

    const retrieveFile=()=>{
        
    }
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input 
            disabled={!account} 
            type="file" 
            id="file-upload" 
            name="data" 
            onChange={retrieveFile}              
            />
            <span className="textArea">Image:{fileName} </span>
            <button type="submit" className="upload">
            Upload File
            </button>
        </form>
    </div>;
};
export default FileUpload;