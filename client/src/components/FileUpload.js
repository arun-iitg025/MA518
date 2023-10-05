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
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({       // pinata se connect karne ke liye use kiya jata hai
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,     // jo bhi data ko upload karenge wo pinta mai upload ho jayega pinata as a service
                    headers: {
                        pinata_api_key: `852e216f793121148c5d`,
                        pinata_secret_api_key: `752b4b58d7fd0307927c0ef838edbe120445f649dc835c83f3bd40fc21199eb5`,
                        "Content-Type":"multipart/form-data",
                    },
                });

                // Image upload hone ke baad mujhe use image ka ek hash milega jiske through hum access kar sakte hai
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                contract.add(account,ImgHash);      // Image ke hash ko blockchaim mai store kar rahe hai
                alert("Successfully Image Uploaded");
                setFileName("No Image Selected");
                setFile(null);
            }catch(e){
                alert("Unable to upload Image to Pinata");
            }
        }
    }

    //ye Images ke data ko fetch karne mei help karegi
    const retrieveFile=(e)=>{
        const data = e.target.files[0]; // files array of files object
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
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