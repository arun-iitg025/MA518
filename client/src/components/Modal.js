import { useEffect, useState } from "react";
import "./Modal.css";
const Modal = ({setModalOpen, contract}) => {
    const sharing = async() =>{
        const address = document.querySelector(".address").value; //yahan se account ko fetch kar lenge
        await contract.allow(address);
        console.log("shared");
    };
    useEffect(() => {
        // yahan fetch karenge ki maine kisko kisho access diya hai;
        const accessList = async () => {
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;

            for(let i=0; i<options.length; i++){
                let opt = options[i];
                let e1 = document.createElement("option");
                e1.textContent = opt;
                e1.value = opt;
                select.appendChild(e1);
            }
        };
        contract && accessList();
    },[]);       //[] ye dependency list hai;
    return <>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Share With</div>
                <div className="body">
                <input type="text" className="address" placeholder="Enter Address"></input>
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className="address">People With Access</option>
                    </select>
                </form>
                <div className="footer">
                    <button onClick={()=>{
                        setModalOpen(false);
                    }}
                    id="cancelBtn">Cancel</button>
                    <button onClick={() => sharing()}>Share</button>
                </div>
            </div>
        </div>
    </>
};
export default Modal