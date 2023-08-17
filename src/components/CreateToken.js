import "./style.css"
import React,{useState,useEffect} from "react";
import binancelogo from '../images/binance.svg'
import ethlogo from '../images/ether.svg'
import firebaseDb from "./firebase";
import {useStore} from "../context/GlobalState";


function CreateToken(){

    const[{initialFieldValues}] = useStore()
    const [click, setClick] = useState(0);
    const tokenvalues = {
        token_name:'',
        token_symbol:'',
        token_supply:'',
        decimal_places:'',
        contract_address:'',
        blockchain:'',
        status:'Created'
    }
    const [tokendata,settokendata] = useState(tokenvalues);

    const [values, setValues] = useState({})
    
    useEffect(()=>{
        setValues(initialFieldValues)
     },[initialFieldValues])

    const addOrEdit = (obj) => {
        const currentId = window.localStorage.getItem('key')
            firebaseDb.child(`users/${currentId}`).set(
                obj,
                err => {
                    if (err){
                        console.log(err)
                        alert("Token Not Created!")
                    }
                    else{
                        alert("Token Created Successfully")
                        window.location.href = './dashboard'
                    } 
                })
       }

       console.log("before ",values)
       
    const onSubmit = ()=> {
        console.log(window.localStorage.getItem('key'))
        console.log(window.localStorage.getItem('userObj'))
        //values.tokens.push(tokenvalues)

        console.log("token data : ", tokendata)
        if(tokendata.token_name !='' && tokendata.token_symbol !='' && tokendata.token_supply !='' && tokendata.decimal_places !='' && tokendata.blockchain != ''){
            if(tokendata.blockchain === "BSC TEST"){
                setValues({...values,tokens:values.tokens.push(tokendata)})
                addOrEdit(values)
            }
            else if(tokendata.blockchain === "BSC MAIN"){
                if(values.credits >= 10 &&  values.credits - 10 >= 0){
                    values.credits -= 10
                    setValues({...values,tokens:values.tokens.push(tokendata)})
                    addOrEdit(values)
                }else{
                    alert("You have no Enough Credits!");
                }
            }
            else if(tokendata.blockchain === "ETH TEST"){
                if(values.credits >= 40 &&  values.credits - 40 >= 0){
                    values.credits -= 40
                    setValues({...values,tokens:values.tokens.push(tokendata)})
                    addOrEdit(values)
                }else{
                    alert("You have no Enough Credits!")
                }
            }
            else if(tokendata.blockchain === "ETH MAIN"){
                if(values.credits >= 20 &&  values.credits - 20 >= 0){
                    values.credits -= 20
                    setValues({...values,tokens:values.tokens.push(tokendata)})
                    addOrEdit(values)
                }else{
                    alert("You have not Enough Credits!")
                }
            }
        }else{
            alert("All fields must be filled.")
        }
    }


  return(
    <div className="body">
    <div className="container body1">
        <div className="row">
            <div className="col-md-12">
                <br/><br/>
                  
                <ul className="list-group list-group-flush" style={{ margin:"10% 0 5% 0"}}>
                    <li className="list-group-item d_li" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px"}}> <h5><b>Create a new ERC20/BEP20 token</b></h5></li>
                    <li className="list-group-item d_li" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px"}}>
                            <br/>
                           <div className="row" style={{fontSize:'14px'}}>
                            <div className="col-md-12">
                                <div className="row">
                                 <div className="col-md-12"><p>TOKEN NAME (MAX 20 CHARS)</p></div>
                                 <div className="col-md-12"><input type="text" class="form-control" placeholder="Choose a token name eg. 'MyToken'" onChange={(e)=>settokendata({...tokendata, token_name: e.target.value})}></input></div>
                               </div>
                               <details>
                                    <summary class="toggle">how do I pick a token name?</summary>
                                    <div class="info2">
                                        You can choose any name you like! It will appear in Etherscan and is
                                        added to the
                                        token smart contract. Pick something memorable that accurately
                                        describes
                                        your brand
                                        or usage.
                                    </div>
                                </details>
                               
                               <br/><br/>
                               
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                 <div className="col-md-12"><p>TOKEN SYMBOL (MAX 6 CHARS)</p></div>
                                 <div className="col-md-12"><input type="text" class="form-control" placeholder="eg. ABC" onChange={(e)=>settokendata({...tokendata, token_symbol: e.target.value})}></input></div>
                               </div>
                               <details>
                                    <summary class="toggle">what's the symbol for?</summary>
                                    <div class="info2">
                                        Crypto-tokens are represented by a token symbol, which is usually
                                        3
                                        characters. This
                                        symbol will appear next to your token in Metamask and other wallets.
                                        For
                                        example,
                                        bitcoin
                                        uses BTC and Ethereum uses ETH. Pick something memorable that
                                        describes
                                        your token.
                                    </div>
                                </details>
                               <br/><br/>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                 <div className="col-md-12"><p>TOTAL SUPPLY (MAXIMUM 100000000000)</p></div>
                                 <div className="col-md-12"><input type="text" class="form-control" placeholder="100000000000" onChange={(e)=>settokendata({...tokendata, token_supply: e.target.value})}></input></div>
                               </div>
                               <details>
                                    <summary class="toggle">what does total supply mean?</summary>
                                    <div class="info2">
                                        When you create your tokens, you set a limit on the total number
                                        that
                                        can exist -
                                        this limit is known as a <b>hard cap</b>. Your total supply can be
                                        anything from
                                        1 token up to 100 billion tokens.
                                    </div>
                                </details>
                               <br/><br/>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                 <div className="col-md-12"><p>DECIMAL PLACES (MAXIMUM 18)</p></div>
                                 <div className="col-md-12"><input type="text" class="form-control" placeholder="18" onChange={(e)=>settokendata({...tokendata, decimal_places: e.target.value})}></input></div>
                               </div>
                               <details>
                                    <summary className="toggle">what are decimal places for?</summary>
                                    <div className="info2">
                                        Just like dollars or euros, ERC20 tokens can be split into smaller
                                        units. A dollar can
                                        be divided into 100 cents, so it has 2 decimal places. <br/><br/>
                                        Your tokens can have up to 18 decimal places (which most tokens
                                        have).
                                        You can even
                                        choose to have 0 decimals, which means your tokens can’t be split!
                                        For
                                        most cases
                                        though, we recommend you use the default 18 decimals.
                                    </div>
                                </details>

                               <br/><br/>
                            </div>

                           
                            <div className="col-md-12">
                                <p>CHOOSE A BLOCKCHAIN</p>
                                    <div className="row">
                                        <div className="col-md-3" id="box1" style={{marginTop:'2%',color:"black"}}
                                            onClick={() => {
                                                    if(click != 1){
                                                        console.log(click);

                                                        settokendata({...tokendata, blockchain:'BSC TEST'});
                                                        document.getElementById('box2').disabled = true;
                                                        document.getElementById('box3').disabled = true;
                                                        document.getElementById('box4').disabled = true;
                                                        document.getElementById('card1').style.border = "5px solid black";
                                                        
                                                        document.getElementById('card2').style.border = "none";
                                                        document.getElementById('card3').style.border = "none";
                                                        document.getElementById('card4').style.border = "none";

                                                        setClick(1);
                                                    }else{
                                                        alert("You can select only 1 blockchain.")
                                                    }
                                                }}
                                        >
                                            <div class="card" id="card1" style={{width: "15.5rem",paddingTop:'5%'}}>
                                                <center>
                                                    <img className="img-thumbnail" src={binancelogo} alt="Card image cap" style={{backgroundColor:'black',height:"50px", width:"50px"}}/>
                                                    <p style={{paddingTop:'3%'}}><b>BSC Testnet</b></p>
                                                        
                                                    <ul className="list-group list-group-flush" style={{marginTop:'-5%', textAlign:'justify'}}>
                                                        <li className="list-group-item"></li>
                                                        <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> BEP20 Token</li>
                                                        <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> Transaction Cost: Very Low</li>
                                                        <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> MetaMask Compatible</li>
                                                    </ul>
                                                </center>
                                            </div>
                                        </div>
                                        

                                        <div className="col-md-3" id="box2" style={{marginTop:'2%',color:"black"}} 
                                            onClick={()=>{
                                                if(click != 2){
                                                    console.log(click);

                                                    settokendata({...tokendata, blockchain:'BSC MAIN'});
                                                    document.getElementById('box1').disabled = true;
                                                    document.getElementById('box3').disabled = true;
                                                    document.getElementById('box4').disabled = true;
                                                    document.getElementById('card2').style.border = "5px solid black";

                                                    document.getElementById('card1').style.border = "none";
                                                    document.getElementById('card3').style.border = "none";
                                                    document.getElementById('card4').style.border = "none";
                                                    setClick(2);

                                                }else{
                                                    alert("You can select only 1 blockchain.")
                                                }
                                            }}
                                        >
                                            <div class="card" id="card2" style={{width: "15.5rem",paddingTop:'5%'}}>
                                            <center>
                                                <img className="img-thumbnail" src={binancelogo} alt="Card image cap" style={{backgroundColor:'black',height:"50px", width:"50px"}}/>
                                                <p style={{paddingTop:'3%'}}><b>BSC Mainnet</b></p>
                                                    
                                                <ul className="list-group list-group-flush" style={{marginTop:'-5%', textAlign:'justify'}}>
                                                    <li className="list-group-item"></li>
                                                    <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> BEP20 Token</li>
                                                    <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> Transaction Cost: Low</li>
                                                    <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> MetaMask Compatible</li>
                                                </ul>
                                                </center>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="col-md-3" id="box3" style={{marginTop:'2%',color:"black"}} 
                                            onClick={()=>{
                                                if(click != 3){
                                                    console.log(click);

                                                    settokendata({...tokendata, blockchain:'ETH TEST'});
                                                    document.getElementById('box1').disabled = true;
                                                    document.getElementById('box2').disabled = true;
                                                    document.getElementById('box4').disabled = true;
                                                    document.getElementById('card3').style.border = "5px solid black";

                                                    document.getElementById('card1').style.border = "none";
                                                    document.getElementById('card2').style.border = "none";
                                                    document.getElementById('card4').style.border = "none";
                                                    
                                                    setClick(3);
                                                }else{
                                                    alert("You can select only 1 blockchain.")
                                                }
                                            }}>
                                        <div class="card" id="card3" style={{width: "15.5rem",paddingTop:'5%'}}>
                                            <center>
                                            <img className="img-thumbnail" src={ethlogo} alt="Card image cap" style={{backgroundColor:'black',height:"50px", width:"50px"}}/>
                                            <p style={{paddingTop:'3%'}}><b>Ethereum Testnet</b></p>
                                                
                                            <ul className="list-group list-group-flush" style={{marginTop:'-5%', textAlign:'justify'}}>
                                                <li className="list-group-item"></li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> ERC20 token</li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> Transaction Cost: Medium</li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> MetaMask Compatible</li>
                                            </ul>
                                            </center>
                                            </div>
                                        </div>
                                        

                                        <div className="col-md-3" id="box4" style={{marginTop:'2%',color:"black"}} 
                                            onClick={()=>{
                                                if(click != 4){
                                                    console.log(click);

                                                    settokendata({...tokendata, blockchain:'ETH MAIN'});
                                                    document.getElementById('box1').disabled = true;
                                                    document.getElementById('box2').disabled = true;
                                                    document.getElementById('box3').disabled = true;
                                                    document.getElementById('card4').style.border = "5px solid black";

                                                    document.getElementById('card1').style.border = "none";
                                                    document.getElementById('card2').style.border = "none";
                                                    document.getElementById('card3').style.border = "none";
                                                    setClick(4);
                                                }else{
                                                    alert("You can select only 1 blockchain.")
                                                }
                                            }}>
                                        <div class="card" id="card4" style={{width: "15.5rem",paddingTop:'5%'}}>
                                            <center>
                                            <img className="img-thumbnail" src={ethlogo} alt="Card image cap" style={{backgroundColor:'black',height:"50px", width:"50px"}} />
                                            <p style={{paddingTop:'3%'}}><b>Ethereum Mainnet</b></p>
                                                
                                            <ul className="list-group list-group-flush" style={{marginTop:'-5%', textAlign:'justify'}}>
                                                <li className="list-group-item"></li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> ERC20 token</li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> Transaction Cost: High</li>
                                                <li className="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-check-circle-o"></i> MetaMask compatible</li>
                                            </ul>
                                            </center>
                                            </div>
                                        </div>

                                </div>  
                              <br/><br/>
                            </div>

                            <div className="col-md-12">
                               <center>
                                <div className="row">
                                 <div className="col-md-6" style={{paddingBottom:'2%'}}> <button type="button" className="btn btn-primary btn_new" style={{width:'40%',borderRadius:'20px', color:'white',borderColor:'black'}} onClick={()=> window.location.href = '/dashboard'}>Cancel</button></div>
                                 <div className="col-md-6"> <button type="button" className="btn btn-primary btn_new" style={{width:'50%',borderRadius:'20px', color:'white',borderColor:'black'}} onClick={onSubmit}>Create a new Token Contract</button></div>
                               </div>
                               </center>
                            </div>

                           </div> 
                        </li>
                </ul>
            </div>
        </div>
      </div>
      <style>{`
      
      .btn_new{
        background: rgb(217,19,175);
        background:linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
      }
      .btn_new{
        background: rgb(98,3,98);
          background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
      }
            
      
      `}</style>
    </div>    
  )
}
export default CreateToken;