import './style.css';
import firebaseDb from "./firebase";
import React,{useState,useEffect} from 'react';
import {useStore} from "../context/GlobalState";
import Moralis from "moralis";
import pageLoader from "../images/pageLoader.gif";


function Account(){
    const[{userss,accounts,initialFieldValues, web3}] = useStore()
    
    const [values, setValues] = useState({})
    const [showComponent, setShowComponent] = useState(false);
    const [ethBal, setEthBal] = useState(0);
    const [tokensData, setTokensData] = useState();
    useEffect(()=>{
      setValues(initialFieldValues);
    
      
      async function fethcData(){
        let balanceInEth = await web3.eth.getBalance(String(initialFieldValues.eth_address).toLowerCase());
        console.log("balanceInEth : ",balanceInEth)
        balanceInEth = balanceInEth/(10**18);
        setEthBal(balanceInEth);
        const userTokens = initialFieldValues.tokens;
        var tokens = [];
        console.log('tokens : ', userTokens)

        for(var i = 0; i < userTokens.length; i++){
          if(userTokens[i].status == 'Transfered'){
            tokens.push(String(userTokens[i].contract_address).toString());
          }
        }
        console.log('total tokens are : ', tokens);
        try {
          await Moralis.start({
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjA3OTI5OWE2LTRjYzUtNDNkYi05ZWIwLTA0M2Q5M2M2NjZjYyIsIm9yZ0lkIjoiMzQ2MzUyIiwidXNlcklkIjoiMzU2MDMyIiwidHlwZUlkIjoiNzA0YzdhYmMtYWI2Mi00NDlmLWI0MDQtNzE5NTQyZDZmMjYxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODgyOTQ4MzMsImV4cCI6NDg0NDA1NDgzM30.vHjDXhXaVkk6QB3HtrSuVeCe8ku1HVRXxuu0XkITL4E"
          });
        
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            "chain": "0x61",
            // "tokenAddresses": tokens,
            "address": accounts[0]
          });
        
          console.log("moralis ", response.raw);
        
         

          const tokensData1 = response.raw;
          setTokensData(tokensData1);
          for(var j = 0; j < userTokens.length; j++){
            for(var k = 0; k < tokensData.length; k++){
              if(String(userTokens[j].contract_address).toLowerCase() == String(tokensData[k].token_address).toLowerCase()){
                // console.log("Balance : ", tokensData[k].balance);
                initialFieldValues.tokens[j].balance = (tokensData[k].balance/ (10 ** tokensData[k].decimals))
                break; 
              }else{
                initialFieldValues.tokens[j].balance = 0;
              }
            }
          }
          console.log("after balance : ", initialFieldValues.tokens) 
     
        } catch (e) {
          console.error(e);
        }
      }
      fethcData();
      const timer = setTimeout(() => {
        setShowComponent(true);
      }, 6000);
      return () => clearTimeout(timer);
    },[initialFieldValues.tokens, ethBal, tokensData])

    
   
    const addOrEdit = (obj) => {
        const currentId = window.localStorage.getItem('key')
            firebaseDb.child(`users/${currentId}`).set(
                obj,
                err => {
                    if (err){
                        console.log(err)
                        alert("Profile not Updated!")
                    }
                    else{
                        alert("Profile Updated Successfully!")
                        window.location.reload()
                    } 
                })
    }
     //  console.log("before ",values)
       
    const onSubmit = ()=>{
      console.log(window.localStorage.getItem('key'))
      console.log(window.localStorage.getItem('userObj'))
      console.log("after ",values)
      addOrEdit(values)
    }
    

    return(
      <div>
      {
        showComponent ? (<div>
        <div className="body">
        <div className="container body1">
            <div className="row" style={{color:'white'}}>
                <div className="col-md-12">
                    <br></br>
                    <h3 style={{ margin:"10% 0 2% 0", color:"white"}}>Your Account</h3>  
                    <h5 style={{ margin:"", color:"white"}}>
                      Account Balance :  
                      &nbsp;
                      {values.eth_address == "" ? "You need to set the account address first" 
                        : 
                       parseFloat(ethBal).toFixed(2)
                      }   BNB
                    </h5>  
                    
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> <h5><b>Your Ethereum Wallet Address</b></h5></li>
                        <li className="list-group-item" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}> we need to know your Ethereum wallet address. If you don't yet have an Ethereum wallet, you can download one for free. We recommend MetaMask, which runs in the Chrome browser.
                            <br/><br/>
                           <div className="row">
                                <div className="col-md-2"><h5 style={{paddingTop:'6px'}}>ETH ADDRESS</h5></div>
                                <div className="col-md-10"><input type="text" class="form-control" value={values.eth_address} onChange={(e)=>{setValues({...values, eth_address: e.target.value})}}></input></div>
                           </div>
                           <br/><br/> 
                        </li>
                     </ul>

                     <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}> 
                          <h5>
                            <b>Account Profile</b>
                          </h5>
                        </li>
                        <li className="list-group-item" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}>You only need to supply your Email and Ethereum Wallet Address to use TokenMaker.org. All other information on your Account Profile is optional.
                            <br/><br/>
                           <div className="row" style={{fontSize:'10px'}}>
                            
                              <div className="col-md-12">
                                <br/>
                                <center>
                                  <div className="row">
                                    <div className="col-md-6" style={{paddingBottom:'2%'}}> 
                                      <button type="button" className="btn btn-primary btn_new" style={{width:'40%',borderRadius:'20px', color:'white',borderColor:'black'}} onClick={()=> window.location.href = '/dashboard'}>
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="col-md-6"> <button type="button" className="btn btn-primary btn_new" style={{width:'40%',borderRadius:'20px', color:'white',borderColor:'black'}} onClick={onSubmit}>Update</button></div>
                                </div>
                                </center>
                              </div>
                           </div> 
                        </li>
                     </ul>

                     <div className="row d_top">
                  <div className="col-sm" >
                      <table className="table table-hover table-dark table-responsive-md" style={{borderRadius:"5px"}}>
                          <thead>
                              <tr>
                              <th scope="col">NETWORK</th>
                              <th scope="col">SYMBOL</th>
                              <th scope="col">NAME</th>
                              
                              <th scope="col">CONTRACT</th>
                              
                              <th scope="col">BALANCE</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                              // initialFieldValues.tokens != null ?  
                              tokensData.map((key) => ( 
                                // key.token_name != "" ?          
                                  <tr>   
                                    <th scope="row">BSC TEST</th>
                                    <td>{key.symbol}</td>
                                    <td>{key.name}</td>
                                    <td style={{color : 'white'}}>{key.token_address}</td>
                                    <td>{key.balance / (10**key.decimals)}</td>
                                  </tr> 
                                // : null
                              )) 
                              // : null
                              }  
                          </tbody>
                      </table>
                  </div>
                </div>

                </div>

                

            </div>
          <br/>
         </div>
      <style>
          {`
      
      .btn_new{
        background: rgb(217,19,175);
        background:linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
      }
      .btn_new{
        background: rgb(98,3,98);
          background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
      }
            
      
      `}
      </style>
         </div>
        
        </div>): (<div>
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
export default Account;