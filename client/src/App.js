import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';
// const {ethereum} = window;
// if(!ethereum) alert("Install Metamask!");
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

    // yahan pe humlog ne contract ka instance create kiye;
  useEffect(() => {
    const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider()); // provider blockchain se data ko read karne ke liye use karte hai
    
    const loadProvider = async() => {
      if(provider){

        // jab account ko change karenge to autometic account change hoker show hone lagega 
        window.ethereum.on("chainChange", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        //yahan jaise hi provider aa jayega mera metamask open ho jayega
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();  // blockchain mai data write karni hai to signer ka use hota hai 
        const address = await signer.getAddress();  // address ko check karenge ki kaun sa account connect gai
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        // yahan contract ke instance ko create karenge
        const contract = new ethers.Contract(
          contractAddress, 
          Upload.abi, 
          signer
        );
       // console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else{
        alert("Install Metamask!");
        console.error("MetaMask is not installed");
      }
    };
    if(window.ethereum)
    provider && loadProvider();
  },[]);
  return (
    <>
    {!modalOpen && (<button className="share" onClick={()=>setModalOpen(true)}>Share</button>)}{""}
    {modalOpen && ( <Modal setModalOpen={setModalOpen} contract={contract}></Modal> )}
    <div className="App">
    <h1>Decentralize File System</h1>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
    
    <p style={{color: "red"}}>Account : {account ? account: "Connect to Wallet"}</p>

    <FileUpload 
      account={account}
      provider={provider}
      contract={contract} 
    ></FileUpload>
    <Display contract={contract} account={account}></Display>
    </div>
    </>
  );
}

export default App;
