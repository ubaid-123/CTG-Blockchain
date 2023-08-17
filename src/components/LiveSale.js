import React, { useState } from "react";
import { useStore } from "../context/GlobalState";
import { PRIVATESALE_ADDRESS, PRIVATESALE_ABI } from '../contract/PrivateSaleContract'
import Loader from '../images/loader.gif';
import { DoLive } from "../store/asyncActions";
import { BigNumber } from 'bignumber.js';
import { useEffect } from "react";
import pageLoader from "../images/pageLoader.gif";


function LiveSale(){
    const [{accounts, privateSaleContract, initialFieldValues, web3},dispatch] = useStore();
    const [isTransactionInProcess0, setTransactionInprocess0] = useState(false);
    const [isTransactionInProcess1, setTransactionInprocess1] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

    const transferTokenABI = [
        {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          }
    ];



    const handleTransferTokens = async ()=> {
        // let privateSaleContract = new web3.eth.Contract(PRIVATESALE_ABI, PRIVATESALE_ADDRESS);
        let saleId = await privateSaleContract.methods.totalSales().call({from : accounts[0]});
        saleId -= 1;
        let salesData = await privateSaleContract.methods.salesData(saleId).call({from : accounts[0]});
        let tokenContract = new web3.eth.Contract(transferTokenABI, salesData.token);
        let tokenAmount =  salesData.tokenAmount;
        tokenAmount = new BigNumber(tokenAmount * 10 ** 18);
        setTransactionInprocess0(true);
        try{
            console.log("acounts 0 live sale: ", accounts[0])
            await tokenContract.methods.transfer(PRIVATESALE_ADDRESS,  tokenAmount).send({
                from: accounts[0],
                gasLimit: web3.utils.toHex(8000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
            });
            setTransactionInprocess0(false);
        }catch (error){
            setTransactionInprocess0(false);
            console.log("error trax = ",error);
        }
    }

    const handleLiveSale = async() =>{
        // if(isSaleLive == "false" && isSalePending == "true"){
            setTransactionInprocess1(true);
            try{
                await DoLive(privateSaleContract, dispatch);
                setTransactionInprocess1(false);
            }catch (error){
                setTransactionInprocess1(false);
                console.log("error trax = ",error);
            }
        // }
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 4000);
        return () => clearTimeout(timer);
    },[])
    return(
        <div>
            {showComponent ?
            (
                <div>
                <div className="body">
                    <div className="container body1">
                        <br/><br/><br/>
                        <center>
                            <div className="row main-box" style={{marginTop:"3%"}}>
                            
                                <div className="col-sm rounded pd">
                                    <div className="row" style={{textAlign:"left"}}>
                                        <h6 className="main_h6">
                                            LIVE YOUR SALE
                                        </h6>
                                        <div className="row">
                                            
                                            {/* TRANSFER TOKENS TO PRIATE SALE CONTRACT */}
                                            <div className="row box2" style={{paddingRight:"3%",paddingBottom:"3%"}}>
                                                <p className="col-sm-6 main_pa1 col-sm" >Click to transfer tokens:</p>
                                                <button type="button" id="claim" onClick={handleTransferTokens} className="btn btn-primary btn-sm btn_new col-sm-6" style={{width:'10%',height:'80%',borderRadius:'20px', color:'white',borderColor:'black',marginTop:"2%"}}>
                                                    TRANSFER TOKENS
                                                    {isTransactionInProcess0 && <img width="40px" src={Loader} alt="Loading..." />} 
                                                </button>
                                            </div>

                                            {/* LIVE SALE */}
                                            <div className="row box2" style={{paddingRight:"3%",paddingBottom:"3%"}}>
                                                <p className="col-sm-6 main_pa1 col-sm" >Click to live your sale:</p>
                                                <button type="button" id="claim" onClick={handleLiveSale} className="btn btn-primary btn-sm btn_new col-sm-6" style={{width:'10%',height:'80%',borderRadius:'20px', color:'white',borderColor:'black',marginTop:"2%"}}>
                                                    LIVE SALE
                                                    {isTransactionInProcess1 && <img width="40px" src={Loader} alt="Loading..." />} 
                                                </button>
                                            </div>
                                            
                                        
                                            
                                                


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <style>{`
                            
                            .box2{
                                width:100%;
                                padding-left:5%;
                            }
                            .main-box{
                                width:100%;
                            }
                            .btn_new{
                                background: rgb(217,19,175);
                                background:linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
                            }
                            .btn_new{
                                background: rgb(98,3,98);
                                background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
                            }
                            .main_pa1{
                                font-size:18px;
                                text-align:left;
                            }
                            h6{
                                font-size:25px;
                            }
                            .token-img{
                                width:45px;
                                height:40px;
                            }
                            
                            `}</style>

                        </center>
                </div>
                </div>
            </div>
            )

            :
            (<div>
                <br/><br/><br/><br/><br/>
                <center>
                  <img src={pageLoader}/>
                </center>
                <br/><br/><br/><br/><br/>
      
              </div>)
            }
           

        </div>
    );
}

export default LiveSale;