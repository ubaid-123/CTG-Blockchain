import React,{useState,useEffect} from "react"
import {useStore} from "../context/GlobalState";
import { NFT_ADDRESS } from '../contract/ERC721';
import { NFTTransfer } from '../store/asyncActions';
import { Network, Alchemy } from "alchemy-sdk";
import not_found from "../images/not_found.jpg";
import { initialFieldValuess } from "../store/actions";
import pageLoader from "../images/pageLoader.gif";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

function Nftstoken(){
    const settings = {
        apiKey: "koHiB-wRHiXXE0cBrrn2aOuRHF_CEx7R", // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);
    
    const[{initialFieldValues,accounts},dispatch] = useStore()
    
    const handleSubmit = async (id,network) => {
       console.log(id, network)
       try {  
           
            const newTransaction = {
                tokenid:id,
                account: initialFieldValues.eth_address,
                chain: network,

             }
            console.log("trx obj ",newTransaction);
            await NFTTransfer(newTransaction, dispatch);   
          
        }catch (error){
            console.log("error trax = ",error); 
        }

    }
    
    const [showComponent, setShowComponent] = useState(false);
    useEffect(()=>{
        async function fetchdata(){
            const userNfts = initialFieldValues.nfts;
            var nfts = [];
            console.log('userNfts : ', userNfts)
            for(var i = 0; i < userNfts.length; i++){
                if(userNfts[i].id != ''){
                    nfts.push({
                        contractAddress: "0x2c03940c5859aecA79dD7e7344b935dA92DF6a04",
                        tokenId: userNfts[i].id
                    })
                }
            }
            console.log('total nfts are : ', nfts);
            
            await alchemy.nft.getNftMetadataBatch(nfts).then((res)=>{
                // console.log("alchemy response : ", res)
                for(var j = 0; j < res.length; j++){
                    if(res[j].media.length > 0){
                        if(res[j].media[0].gateway != ""){
                            let tokenId = res[j].tokenId
                            console.log('token id : ', tokenId)
                            
                            for(var k = 0; k < userNfts.length; k++){
                                if(userNfts[k].id == tokenId){
                                    console.log('j , k :', j, k)
                                    initialFieldValues.nfts[k].image = res[j].media[0].gateway;
                                }
                            }
                        }
                    }
                }
            });
            console.log('initialFieldValues.nfts: ', initialFieldValues.nfts);


            try{
                await Moralis.start({
                    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA3OTI5OWE2LTRjYzUtNDNkYi05ZWIwLTA0M2Q5M2M2NjZjYyIsIm9yZ0lkIjoiMzQ2MzUyIiwidXNlcklkIjoiMzU2MDMyIiwidHlwZUlkIjoiNzA0YzdhYmMtYWI2Mi00NDlmLWI0MDQtNzE5NTQyZDZmMjYxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODgyOTQ4MzMsImV4cCI6NDg0NDA1NDgzM30.vHjDXhXaVkk6QB3HtrSuVeCe8ku1HVRXxuu0XkITL4E"
                });

                const chain = EvmChain.BSC_TESTNET;

                const response = await Moralis.EvmApi.nft.getContractNFTs({
                    "address" : "0x2c03940c5859aecA79dD7e7344b935dA92DF6a04",
                    "chain" : chain,
                });

                console.log(response.toJSON());
            }catch(error){
                console.log("errr : ", error)
            }
            dispatch(initialFieldValuess(initialFieldValues));
        }
        fetchdata();
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 3000);
        return () => clearTimeout(timer);
    },[initialFieldValues.nfts])

    

    return(
    // console.log(Object.keys(nftImages).length, nftImages)
    // Object.keys(nftImages).length > 0?
    
        <div>
        
            {
 
                showComponent  ?(
            <div>
                {console.log('jhdfsfjdkshfjkd')}
                <br/>
                <div className="body">
                    <div className="container body1">
                        <div className="container" style={{ minHeight:'540px',height:"100%" }}>
                            <br/><br/>    
                            <div className="row subhead">
                                <h4 style={{marginLeft: "90px"}} className="mid">YOUR NFTs</h4>
                            </div>
                        
                        
                        
                                
                            {/* If NTf Not Exists */}


                            {/* ***----***-------****--------***-------**8 */}


                            <div>
                                <input type="button" className="cta btn btn-primary btn_new" style={{width:'25%',borderRadius:'20px', color:'white',borderColor:'black'}} value="Mint a new NFT" onClick={()=> window.location.href = '/nftStudio'}/>
                            </div>
                                
                                <br/><br/>

                            <div id="nfts" className="nfts">
                            {
                                initialFieldValues.nfts != null && initialFieldValues.nfts.length != 1 ?  
                                initialFieldValues.nfts.map((key) => ( 
                                    key.name != "" ?
                                            <div className="nft" id="nft_1631527538734">
                                                <div className="nft_head">
                                                    <span>{key.name}</span>
                                                    <div>
                                                        {key.description}
                                                    <div className="collapsed question-toggle" data-toggle="collapse" data-target={"#options_"+key.id} style={{marginLeft:"98%"}}>
                                                        <i className="nft_more_icon fa fa-ellipsis-v "/>
                                                    </div>
                                                    </div>
                                                    <div className="nft_network">
                                                        {key.network}
                                                    </div>
                                                </div>
                                                <div id={"options_"+key.id}>
                                                    <button className="btn btn-dark" style={{backgroundColor:'black',border:'none', fontSize:'15px'}} onClick={()=>handleSubmit(key.id,key.network)}>Transfer this NFT to my wallet address</button>
                                                </div>

                                                <div className="nft_body">
                                                    {console.log('image : ', key.image)}
                                                    <a href="https://nft.tokenmaker.org/e083a1a2-a8ed-46fa-a017-d3db4ec4f0b3.png?tokenid=1631527538734" target="new">
                                                        <img className="nft_media" src={key.image != undefined && key.image != '' && key.image != null? key.image : not_found}/>
                                                    </a>
                                                    <br/><br/>
                                                    <a href={`https://testnets.opensea.io/assets/bsc-testnet/0x2c03940c5859aeca79dd7e7344b935da92df6a04/${key.id}`} target="new">
                                                        <div className="contract">Check on Opensea</div>
                                                    </a>
                                                    <br/><br/>
                                                </div>

                                                <div className="nft_footer">
                                                    #{key.id}
                                                    <div className="nft_tags">
                                                        {key.tag}
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                            )) : <div className="prompt_log">
                                                    <p>You don't have any NFTs in your collection yet.</p>
                                                    </div>
                            }
                            
                            </div>

                                    
                        
                        </div>

                    </div>
                </div>



                <style>
                    {`

                    body {
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
                    
                    .nfts {
                        width: 100%;
                        height: fit-content;
                        
                    }

                    @media (min-width: 1024px){}
                        .nft {
                            position: relative;
                            min-width: 260px;
                            display: inline-block;
                            margin: 0px 0px 10px 8px;
                            box-shadow: 0px 4px 6px rgb(0 0 0);
                            color: #fff;
                        }
                    }
                    .nft{
                        padding: 0 2;
                    }
                    .nft_head {
                        padding: 10px;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                        background-color: rgba(255,255,255,0.2);
                        font-size: 12px;
                        font-weight: 400;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .nft_options {
                        background-color: #000;
                        color: #fff;
                        z-index: 99999;
                        height: auto;
                        padding: 0px 10px;
                        overflow: visible;
                        transition: 0.3s all;
                        cursor: pointer;
                        font-size:14px;
                    }
                    .nft_body {
                        min-height: 140px;
                        padding: 10px;
                        background-color: rgba(0,0,0,0.1);
                        text-align: center;
                    }
                    .nft_footer {
                        padding: 10px;
                        background-color: rgba(255,255,255,0.2);
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                        color: #fff;
                        font-weight: 600;
                        font-size: 12px;
                    }
                    .nft_more {
                        cursor: pointer;
                        position: relative;
                        float: right;
                        width: 13px;
                        text-align: right;
                        // padding-Right: 2%;
                    }
                    .nft_more_icon {
                        height: 13px;
                    }
                    .nft_network {
                        position: absolute;
                        top: 1px;
                        right: 5px;
                        float: right;
                        font-size: 10px;
                        font-weight: 700;
                        color: rgba(255,255,255,0.5);
                    }
                    .nft_head span {
                        font-size: 20px;
                        font-weight: 500;
                        display: block;
                        text-transform: none;
                        margin-bottom: 10px;
                        width: 180px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    a {
                        text-decoration: none;
                        // color: #fff;
                        font-weight: 400;
                    }
                    .nft_media {
                        height: 100px;
                        max-width: 230px;
                    }
                    .nft_tags {
                        float: right;
                        font-size: 12px;
                        font-weight: 600;
                        color: rgba(255,255,255,0.6);
                    }
                    

                    .contract {
                        cursor: pointer;
                        display: inline-block;
                        padding: 4px 10px 4px 15px;
                        border-radius: 20px;
                        background-color: rgba(0,0,0,0.1);
                        color: #fff;
                        font-size: 12px;
                        font-weight: 400;
                        width: fit-content;
                        transition: 0.2s all;
                        border: solid 1px rgba(0,0,0,0);
                    }
                    .contract:hover {
                        background-color: rgba(255,255,255,0.2);
                        border: solid 1px rgba(255,255,255,0.6);
                        transition: 0.2s all;
                        white-space: nowrap;
                    }

                    `}
                </style>

            </div>
                ):(<div>
                    <br/><br/><br/><br/><br/>
                    <center>
                      <img src={pageLoader}/>
                    </center>
                    <br/><br/><br/><br/><br/>
          
                  </div>)
            }
        </div>
    
    )
  }
export default Nftstoken;