import React,{useState,useEffect} from "react"
import firebaseDb from "./firebase";
import upload_file from '../images/upload_file.svg';
import eth from '../images/ether.svg';
import bsc from '../images/binance.svg';
import info from '../images/info.svg';
import {useStore} from "../context/GlobalState";
import { NFTMinting } from '../store/asyncActions';
//import {ROPSTEN_NFT_ADDRESS,RINKEBY_NFT_ADDRESS} from '../contract/ECR721SmartContract';
// import {pinataConfig} from './ipfs'
// import ipfs from './ipfs'
import axios from "axios";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNDFlODE3OS1lOTMyLTQyNTItYmY5MC03YzQyZDY3NDIyNGQiLCJlbWFpbCI6InViYWlkc2hhYmJpci5hcHRlY2hpaWNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZhZWYyOTRiNDAxNGJjNTI5MDBlIiwic2NvcGVkS2V5U2VjcmV0IjoiOWVjMzk5NmFkNTQ5ZjZiZGRjYTUxNGQwNWE3YTY5ODRlOTE4ODE1OTFiZGM1NGJlZDk3YjQwZWUwNmM2OGQwYyIsImlhdCI6MTY4NDE1NzYzOX0.EvNfnDH-RNhYIYqZ3fFc-IFpJFkD9SL1191eW1MwAJM`
function NftStudio(){
   
    const[{goerli_nft_supply, rinkeby_nft_supply, ropsten_nft_supply, rinkeby_nft_contract, initialFieldValues, accounts, nftCreditRate},dispatch] = useStore();
    const [click, setClick] = useState(false);
    const [isTransactionInProcess0, setTransactionInprocess0] = useState(false);

    // var rinkeby_token_id = Number(rinkeby_nft_supply) + Number(1)
    // var ropsten_token_id = Number(ropsten_nft_supply) + Number(1)

    const nftData = {
        id:'',
        name:'',
        image:'',
        tag:'',
        description:'',
        network:''
    }

    const [nftvalues,setnftvalues] = useState(nftData)
    const [ipfsHash,setipfsHash] = useState("")
    const [values, setValues] = useState({})


    useEffect(()=>{
        setValues(initialFieldValues)
    },[initialFieldValues])
      
  
    const [selectedFile, setSelectedFile] = useState();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("file : ",event.target.files[0]);
      };
    
   
    // const captureFile = (e) => {
    //     e.preventDefault()
    //     const file = e.target.files[0]
    //     console.log("file : ", file)
    //     setimagebuffer(file);

    //     // var output = document.getElementById('images');
    //     // output.src = URL.createObjectURL(e.target.files[0]);
    //     // output.onload = function() {
    //     //   URL.revokeObjectURL(output.src) // free memory
    //     // }
    //     // console.log(file)
         
    //     // const reader = new window.FileReader(file)
    //     // reader.readAsArrayBuffer(file)
    //     // reader.onloadend = () => {
    //     //     // setimagebuffer(ipfs.Buffer(reader.result)) 
    //     //     setimagebuffer(Buffer.from(reader.result));
    //     //     // console.log('buffer', Buffer.from(reader.result))
    //     // }  
    // }

    // const upload_data = async () => {
    //     console.log('Buffer : ', imagebuffer);
    //     await ipfs.add(imagebuffer,(error,result)=>{
    //         if(error){
    //             console.log("error ="+error);
    //         }
    //         else{
    //             setipfsHash(result[0].hash)
    //             console.log("result =",result[0].hash)
                
    //             var hash = result[0].hash;
    //             nftvalues.image = `https://gateway.pinata.cloud/ipfs/${hash}`
    //             const metadata = JSON.stringify({
    //                 name: nftvalues.name,
    //                 description: nftvalues.description,
    //                 tag: nftvalues.tag,
    //                 image: nftvalues.image
    //             });
            
    //             ipfs.add(ipfs.Buffer(metadata)).then((result,error)=>{
    //                 if(error){
    //                   console.log("error ="+error)
    //                 }
    //                 else{
    //                 console.log("result =", result[0].hash)
    //                 var has = result[0].hash;
            
    //                         (async function() {
    //                             try {  
    //                                 const newTransaction = {
    //                                 _tokenuri: `https://gateway.pinata.cloud/ipfs/${has}`,
    //                                     chain: nftvalues.network,
    //                                     nftData: nftvalues
    //                                 }
    //                                 console.log("trx obj ",newTransaction);
                                    
    //                                 await NFTMinting(newTransaction, dispatch);
                                    
                                    
    //                             }catch (error){
    //                                 console.log("error trax = ",error); 
    //                             }
    //                             })(); 
    //                         }             
    //             })
        
    //         }
    //     })
    // }  

    
// const upload_ipfs_data = async () => {
//         try{
//             console.log("imagebuffer : ", imagebuffer)
//             // const formData = new FormData();
//             // formData.append('file', imagebuffer);
        
//             // console.log("formData: ", formData);
            
//             const img_url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
//             const img_response = await axios({
//                 method: 'post',
//                 url: img_url,
//                 data: imagebuffer,
//                 headers: pinataConfig.headers
//             });

//             console.log("img_response : ", img_response);

//             let imageHash = img_response.data.IpfsHash;
//             let obj = {
//                 name: nftvalues.name,
//                 image: `https://gateway.pinata.cloud/ipfs/${String(imageHash)}`,
//                 description: nftvalues.description,
//                 network: nftvalues.network,
//                 attributes: nftvalues.attributes,
//             }
//             const metadata_url = `${pinataConfig.root}/pinning/pinJSONToIPFS`;
//             const metadata_response = await axios({
//                 method: 'post',
//                 url: metadata_url,
//                 data: obj,
//                 headers: pinataConfig.headers
//             })
//             return `https://gateway.pinata.cloud/ipfs/${metadata_response.data.IpfsHash}`;
//         }
//         catch(error){
//             // swal({text: error.message, icon: "error", className: "sweat-bg-color"});
//             console.log("Error from IPFS ", error.message);
//         }
//     }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(nftvalues.network === "goerli"){
//         console.log("handle if")
//         upload_ipfs_data()
//     }
//     else if(nftvalues.network === "mainnet"){
//        if(values.credits >= 6){
//         upload_ipfs_data()
//        }
//        else{
//           alert("You have not Enough Credits!")
//        }
//     }
// }

    const handleSubmission = async() => {
        if(Number(values.credits) >= Number(nftCreditRate) && Number(values.credits) - Number(nftCreditRate) >= 0){

            const formData = new FormData();
            formData.append('file', selectedFile)
    
            const metadata = JSON.stringify({
                name: 'File name',
            });
            formData.append('pinataMetadata', metadata);
            
            const options = JSON.stringify({
                cidVersion: 0,
            })
            formData.append('pinataOptions', options);
    
            try{
                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT
                    }
                }).then(async (res)=>{
                    console.log('then block res : ', res)
                    setnftvalues({...nftvalues, image: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}.png`});

                    var data = JSON.stringify({
                        "pinataContent": {
                            image: res.data.IpfsHash,
                            name: nftvalues.name,
                            description: nftvalues.description,
                            network: nftvalues.network,
                            tag: nftvalues.tag,
        
                        }
                    });
        
                    var config = {
                        method: 'post',
                        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                        headers: { 
                            'Content-Type': 'application/json', 
                            'Authorization': JWT
                        },
                        data : data
                    };
                        
                    const res1 = await axios(config);
                    setTransactionInprocess0(true);
                    try{
                        const newTransaction = {
                            _tokenuri: res1.data.IpfsHash,
                            chain: nftvalues.network,
                            nftData: nftvalues,
                            creditRate : nftCreditRate
                        }
                        await NFTMinting(rinkeby_nft_contract, newTransaction, accounts, dispatch);
                        setTransactionInprocess0(false);
                    }catch (error){
                        setTransactionInprocess0(false);
                        console.log("error trax = ",error);
                    }
                    console.log(res1.data);
                });

                // console.log(res.data);
                // (()=>{
                //     console.log('a')
                //     setnftvalues({...nftvalues, image: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}.png`});
                //     console.log('b')
                // })();

               
            
            } catch (error) {
                console.log(error);
            }
        }else{
            alert("You have not Enough Credits!")
        }
        
    };
    
   return(
    <div>
        <div className="body">
            <div className="container body1">
                <div className="container" style={{height:"100%" }}>
                    <br/><br/><br/><br/>    
                    <div className="row subhead">
                        <p className="mid">NFT Studio</p>
                    </div>

                    <div class="notifications">
                        <div class="notification">
                            <div class="prompt"> <span>Mint your own NFT below.</span> Just upload an image and fill in the
                                fields.
                            </div>
                            <br/>
                            <div class="prompt"> 
                            <b>Note: </b> After click on the Create Your NFT Button Button, You have to wait for 60 seconds to complete the transaction and You will receive the confirmation alert.
                            </div>
                        </div>
                    </div>

                    <div>

                        <input class="cta" onClick={()=> window.location.href = '/nftstoken'} type="button" className="btn btn-primary btn_new" style={{borderRadius:'20px', color:'white',borderColor:'black'}} value="go to your NFT collection"/>
                    
                    </div>
                    
                    <br/>
                    <br/>

                    <div id="addtokenpanel" class="feature f0">
                        <div id="nft_col_left" class="rbox center">
                            <div class="formhead_studio">Designer</div>
                                <div class="formbody">
                                    <form class="glass" id="uploadForm_nft" method="post" enctype="multipart/form-data">
                                        
                                        <div class="dropboxwrapper">
                                            <div class="dropbox dropbox_nft">
                                                <div class="drop">
                                                    <div class="cont">
                                                        <div class="title">
                                                            Drag an image here (max size 2Mb)
                                                        </div>
                                                        <div class="desc">
                                                            or click to select PNG, GIF, WebP, MP3 or MP4
                                                        </div>
                                                        <div class="browse">
                                                            <img id="images" src={upload_file}/>
                                                        </div>
                                                    </div>
                                                    <output class="droplist" id="droplist_nft"></output>
                                                    <input class="fileup" id="files_nft" multiple="true" name="uploadFile" type="file" onChange={changeHandler}/>
                                                    <input type="hidden" name="success"/>
                                                    <input type="hidden" name="fail"/>
                                                </div>
                                            </div>
                                        </div> 

                                        <br/>

                                        {/* <!-- name  --> */}
                                        <div class="nft_field">
                                            <p>Name</p>
                                            <input name="name" id="name" maxlength="80" type="text" required="" placeholder="eg. &quot;Digital Art Piece #1&quot;" 
                                                onChange={(e)=> setnftvalues({...nftvalues, name: e.target.value, id: Number(goerli_nft_supply)+Number(1)})}
                                            />
                                                <div class="error name hidden">please enter a name</div>
                                        </div>

                                        {/* <!-- description  --> */}
                                        <div class="nft_field">
                                            <p>Description</p>
                                            <input name="description" id="description" maxlength="80" type="text" required="" placeholder="eg. &quot;Your imagination immortalised on the blockchain&quot;" onChange={(e)=> setnftvalues({...nftvalues, description: e.target.value })}/>
                                                <div class="error description hidden">please enter a description</div>
                                        </div>

                                        {/* <!-- created by  --> */}
                                        <div class="nft_field">
                                            <p>Created By</p>
                                            <input name="author" id="author" maxlength="60" type="text" required="" placeholder="eg. &quot;Jane Doe, Artist&quot;"/>
                                                <div class="error author hidden">please enter an author name</div>
                                        </div>

                                        {/* <!-- tags  --> */}
                                        <div class="nft_field">
                                            <p>Tags</p>
                                            <input name="tags" id="tags" maxlength="40" type="text" required="" placeholder="eg. &quot;Digital, NFT, Unique&quot;" onChange={(e)=> setnftvalues({...nftvalues, tag: e.target.value })}/>
                                                <div class="error tags hidden">please enter one or more tags separated by commas</div>
                                        </div>

                                        {/*  <!-- network  --> */}
                                        <p>Network</p>
                                        <div class="nft_field row">
                                            

                                            <button id="card1" style={{backgroundColor: 'transparent', color: 'white'}} class="network left col-md-5" 
                                                onClick={(e) => {
                                                    if(click === false){
                                                        e.preventDefault();
                                                        setnftvalues({...nftvalues, network: "goerli"}); 
                                                        document.getElementById('card1').style.border = "10px solid black";
                                                        setClick(true);
                                                        // document.getElementById('card2').disabled = true;
                                                    }else{
                                                        alert("You can select only 1 blockchain");
                                                    }
                                                    
                                                }}>
                                                <div class="network_inner">
                                                    <img class="network_icon2" src={eth}/>
                                                </div>
                                                <div class="network_note">Ethereum Goerli</div>
                                                <div class="network_price">Free</div>
                                            </button>

                                            {/* <button id="card2" style={{backgroundColor: 'transparent', color: 'white'}} class="network left col-md-5" 
                                                onClick={ (e)=> {
                                                    if(click === false){
                                                        e.preventDefault();
                                                        setnftvalues({...nftvalues, network: "mainnet"});
                                                        document.getElementById('card2').style.border = "10px solid black";
                                                        setClick(true);
                                                        document.getElementById('card1').disabled = true;
                                                    }else{
                                                        alert("You can select only 1 blockchain");
                                                    }
                                                }}>
                                                <div class="network_inner">
                                                    <img class="network_icon2" src={eth}/>
                                                </div>
                                                <div class="network_note">Ethereum MainNet</div>
                                                <div class="erc721_cost_eth network_price">0.06 ETH</div>
                                            </button> */}


                                            

                                            
                                            
                                        </div>
                                        <div class="warn_credit">
                                                <div class="mid">
                                                    <img style={{height: '16px',marginTop: '6px'}} src={info}/>
                                                </div>
                                                <div class="mid">
                                                    {/* You don't have sufficient credit to mint NFT's on MainNet. */} You need at least <span class="erc721_credit_qty">{nftCreditRate}</span> credits (costing <span class="erc721_cost_eth">0.06 ETH</span>). 
                                                        <a class="link" onClick={()=> window.location.href = '/BuyCredits'}>Buy credits now</a>.
                                                </div>
                                        </div>
                                    </form>
                                        <div class="nft_field">
                                            <div id="cta" class="cta_large" onClick={handleSubmission}>Create your NFT</div>
                                            &nbsp;
                                            <div id="mint_spin" class="hidden">
                                                <img id="minting_spinner" src="img/minting.svg"/>
                                                <br/>
                                                Please wait while your NFT is minted..
                                            </div>
                                        </div>
                                </div>
                        </div>
                        <br/><br/>
                    </div>



                </div>
            </div>
        </div>
        
        <style>{`
            
            body{
                color: white;
            }
            .btn_new{
                background: rgb(217,19,175);
                background:linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
            }
            .btn_new{
                background: rgb(98,3,98);
                background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
            }

            .rbox.center {
                width: 100%;
            }

            .rbox {
                position: relative;
                background-color: rgba(255,255,255,0.1);
                border-radius: 10px;
                color: #fff;
                font-size: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .formhead_studio {
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                padding: 12px 25px;
                color: #fff;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }

            .formbody {
                padding: 5px 20px 25px 20px;
            }
            form.glass {
                background-color: rgba(255,255,255,0.0);
                border-radius: 0px;
            }
            form {
                display: block;
                margin-top: 0em;
            }
            form input {
                appearance: none;
                -webkit-appearance: none;
                display: inline-block;
                vertical-align: top;
                margin: 4px;
                padding: 10px;
                font-size: 18px;
                font-weight: 500;
                width: 90%;
                border: solid 1px rgba(255,255,255,0.6);
                border-radius: 3px;
                background-color: rgba(255,255,255,0.1);
                color: #fff;
                outline: none;
            }
            .dropbox {
                position: relative;
                height: 200px;
                border: dashed 4px rgba(255,255,255,0.4);
            }
            .drop input.fileup {
                cursor: pointer;
                background: red;
                opacity: 0;
                margin: auto;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
            }
            .drop {
                border-radius: 1px;
                overflow: hidden;
                text-align: center;
                -webkit-transition: all 0.5s ease-out;
                -moz-transition: all 0.5s ease-out;
                transition: all 0.3s ease-out;
                margin: auto;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
            .drop:hover {
                background-color: rgba(255,255,255,0.1);
                transition: 0.4s all;
                cursor: pointer;
            }
            .drop .cont {   
                height: 100%;
                color: #8E99A5;
                -webkit-transition: all 0.5s ease-out;
                -moz-transition: all 0.5s ease-out;
                transition: all 0.3s ease-out;
                margin: auto;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
            .drop .cont .title {
                font-size: 15px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 5px;
            }
            .drop .cont .desc {
                color: rgba(255,255,255,0.8);
                font-size: 12px;
                font-weight: 600;
            }
            .drop:hover .cont .browse {
                opacity: 0.8;
            }
            .drop .cont .browse {
                margin: 10px auto;
                color: #fff;
                padding: 9px 25px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 16px;
                width: 150px;
                opacity: 0.4;
            }
            .nft_field {
                margin-bottom: 20px;
            }
            .nft_field input[type="text"] {
                appearance: none;
                -webkit-appearance: none;
                display: inline-block;
                vertical-align: top;
                margin: 5px 0px;
                padding: 7px;
                font-size: 18px;
                font-weight: 500;
                width: 100%;
                border: solid 1px rgba(255,255,255,0.6);
                border-radius: 3px;
                background-color: rgba(255,255,255,0.1);
                color: #fff;
                outline: none;
            }
            .error {
                color: rgb(250, 200, 200);
                padding: 5px 0px;
                width: 100%;
                font-weight: 600;
            }
            .hidden {
                display: none;
            }
            .network_icon2 {
                padding-top: 10px;
                height: 50px;
            }
            .notavail {
                cursor: auto!important;
                background: repeating-linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0) 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px );
                opacity: 0.9;
            }
            .network.left {
                margin-right: 5px;
            }
        
                .network.selected {
                    border: solid 1px rgba(255,255,255,1.0);
                    background-color: rgba(255,255,255,0.2);
                }
        
            @media(min-width: 1024px)
            {
                .network {
                    border-radius: 10px;
                    padding: 10px 10px 50px 10px;
                    border: solid 2px rgba(255,255,255,0.4);
                    display: inline-block;
                    width: calc(25% - 8px);
                    text-align: center;
                    vertical-align: top;
                    transition: 0.3s all;
                    cursor: pointer;
                    min-height: 120px;
                }
            }
            @media (max-width: 1023px)
            {
                .network {
            border-radius: 10px;
            padding: 10px 10px 50px 10px;
            border: solid 1px rgba(255,255,255,0.4);
            display: inline-block;
            width: 100%;
            margin-bottom: 20px;
            text-align: center;
            vertical-align: top;
            transition: 0.3s all;
            cursor: pointer;
            min-height: 150px;
        }
        }
            .network.notavail {
                cursor: auto!important;
                background: repeating-linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0) 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px );
            }
            .network.left {
                margin-right: 5px;
            }
            .nft_field .network .network_inner {
                font-size: 13px;
                font-weight: 700;
                color: rgba(255,255,255,0.8);
                display: inline-block;
                vertical-align: middle;
            }
            .network_note {
                font-size: 12px;
                padding: 10px 0px 20px 0px;
            }
            .network_price {
                font-size: 20px;
                padding-bottom: 20px;
            }
            .notavail {
                cursor: auto!important;
                background: repeating-linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0) 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 16px );
                opacity: 0.9;
            }
            .warn_credit {
                padding: 10px;
            }
            .mid {
                display: inline-block;
                vertical-align: middle; 
                padding-left:1%;
                
            }
            .link {
                font-weight: 600;
            }
            .link:hover{
                color:white;
                background-color: rgba(255,255,255,0.3);
            }
            a {
                text-decoration: none;
                // color: #fff;
                font-weight: 400;
            }
            .cta_large {
                text-align: center;
                cursor: pointer;
                appearance: none;
                -webkit-appearance: none;
                display: inline-block;
                background-color: rgba(255, 255, 255,0.1);
                color: #fff;
                font-weight: 600;
                font-size: 16px;
                transition: 0.2s all;
                border: solid 1px rgba(255,255,255,0.7);
                border-radius: 6px;
                text-transform: uppercase;
                white-space: nowrap;
                padding: 25px 0px;
                width: 100%;
                height: 80px;
            }

            .cta_large:hover {
                background-color: rgba(255,255,255,0.3);
                transition: 0.4s all;
                cursor: pointer;
            }







        `}
        </style>
    </div>

   )
}
export default NftStudio;