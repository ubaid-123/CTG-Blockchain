import React, { useEffect, useState } from "react";
import { CreateNewSale } from '../store/asyncActions'
import { useStore } from '../context/GlobalState'
import Loader from '../images/loader.gif';
import { PRIVATESALE_ADDRESS } from '../contract/PrivateSaleContract'
import firebaseDb from "./firebase";

function CreatePreSale(){
    const [{accounts, privateSaleContract, initialFieldValues, web3, privateSaleCreditRate},dispatch] = useStore();
    const [values, setValues] = useState({})
    const [isTransactionInProcess0, setTransactionInprocess0] = useState(false);
    
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


    const tokenABI = [
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // const [tokenDbData, setTokenDbData]= useState({
    //     token_name : '',
    //     token_symbol : '',
    //     decimal_places : ''
    // });

    const tokenvalues = {
        token_name : '',
        decimal_places : '',
        token_symbol : '',
        token_amount : '',
        token_address : '',
        token_image : '',
        token_price : '',
        // start_time : '',
        end_time : '',
        claiming_time: ''
    }
    const [tokendata,settokendata] = useState(tokenvalues)
    
    useEffect(()=>{
        setValues(initialFieldValues);
    },[initialFieldValues])

    function onlyNumberKey(evt) {
          
        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }

    function convertDate(date){
        var dateTimeParts = String(date).split('T')
        var timeParts = String(dateTimeParts[1]).split(':')
        var dateParts = String(dateTimeParts[0]).split('-')
        
        console.log(date)
        date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

        console.log(date.getTime()/1000);
        return String(date.getTime()/1000);
    }   
    
    function addminutestoTimestamp(timestamp, minutes){
        if(timestamp != 0){
            var date = new Date(timestamp * 1000);
            var newDate = new Date(date.getTime() + minutes * 60000).getTime()/1000;
            console.log("New = ",newDate)
            return String(newDate);
        }
    }
    
    async function handleTokenAddress(address){
        console.log("address : ", address)
        // settokendata({...tokendata, token_address: address});
        let tokenContract = new web3.eth.Contract(tokenABI, address);
        let tokenName = await tokenContract.methods.name().call({from: accounts[0]}); 
        let tokenSymbol = await tokenContract.methods.symbol().call({from: accounts[0]}); 
        let tokenDecimals = await tokenContract.methods.decimals().call({from: accounts[0]}); 
        
        settokendata({...tokendata, token_address: String(address), token_name: tokenName, token_symbol: tokenSymbol, decimal_places: tokenDecimals})
        console.log("tokenName : ", tokenName);
        console.log("tokenSymbol : ", tokenSymbol);
        console.log("tokenDecimals : ", tokenDecimals);

    }

    const onSubmit = async ()=>{
        if(Number(values.credits) >= Number(privateSaleCreditRate) && Number(values.credits)-Number(privateSaleCreditRate) >= 0){
            if(
                tokendata.token_name     == '' &&
                tokendata.decimal_places == '' &&
                tokendata.token_symbol   == '' &&  
                tokendata.token_amount   == '' &&  
                tokendata.token_address  == '' &&
                tokendata.end_time       == '' &&  
                tokendata.claiming_time  == '' &&  
                tokendata.token_price    == ''   
                // && tokendata.start_time     == '' 
            ){
                alert("All fields must be filled.");   
            }
            else{
                console.log(tokendata);
                // if(tokendata.end_time != 0 && tokendata.claiming_time != 0){
                    // if(addminutestoTimestamp(Number(tokendata.start_time, 10080) <= tokendata.end_time)){
                        if(tokendata.claiming_time < tokendata.end_time){

                            setTransactionInprocess0(true);
                            try{
                                const newTransaction = {
                                    token_amount : tokendata.token_amount,
                                    // start_time : tokendata.start_time,
                                    end_time : tokendata.end_time,
                                    claiming_time : tokendata.claiming_time,
                                    token_price : tokendata.token_price,
                                    token_address : tokendata.token_address,
                                    token_name : tokendata.token_name,
                                    token_symbol : tokendata.token_symbol,
                                    decimal_places : tokendata.decimal_places,
                                    imageLink : tokendata.token_image,
                                    creditRate : Number(privateSaleCreditRate)
                                }
    
                                await CreateNewSale(privateSaleContract, newTransaction, accounts, dispatch);
                                // setValues({...values, sale:values.sale.push(tokendata)})
                                // addOrEdit(values)
                                setTransactionInprocess0(false);
                                //window.location.href = "./liveSale";
                            }catch (error){
                                setTransactionInprocess0(false);
                                console.log("error trax = ",error);
                            }
                        }else{
                            alert("Claiming time must be less than end time.");
                        }
                    // }else{
                    //     alert("You can run your sale for only 7 Days maximum.");
                    // }
                // }
                // else
                //     alert("End Time must be greater 1 and less than equal to 10.");    
            }
        }else{
            alert("You have not Enough Credits!");
        }
    }

    return(
        <div className="body">
            <div className="container body1">
                <div className="row">
                    <div className="col-md-12">
                        <br/><br/>
                  
                        <ul className="list-group list-group-flush" style={{ margin:"10% 0 5% 0"}}>
                            <li className="list-group-item d_li" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px"}}> <h1><b>CREATE YOUR OWN PRIVATE-SALE</b></h1></li>
                            <li className="list-group-item d_li" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px"}}>
                            

                            <div className="row" style={{fontSize:'14px'}}>

                                <div className="col-md-12">
                                    <h6>IMPORTANT POINTS: </h6>
                                    <ul>
                                        <li>THIS FEATURE IS ONLY FOR AVAX TOKENS.</li>
                                        <li>ALL THE INFORMATION ABOUT TOKEN MUST BE VALID.</li>
                                        <li>YOU NEED TO PAY 40 CREDITS FOR CREATE YOUR OWN SALE.</li>
                                        <li>YOU CAN RUN YOUR SALE MAXIMUM 7 DAYS.</li>
                                        <li>AFTER CREATING SALE, YOU NEED TO DEPOSIT THE TOKENS TO THIS ADDRESS {PRIVATESALE_ADDRESS}</li>
                                        <li>AFTER DEPOSIT THE TOKENS, YOUR SALE WILL BE LIVE IN 1 MINUTE.</li>
                                        <li>IF YOU WILL NOT DEPOSIT YOUR TOKENS, THEN YOUR SALE WILL NOT LIVE AND YOU WILL LOSS YOUR CREDITS.</li>
                                        <li>AFTER THE SALE, REMAMING TOKENS AND COLLECTED FUND WILL SEND TO YOUR ADDRESS.</li>
                                        <li>FROM THE COLLECTED FUND OF YOUR SALE, 2% FUND WILL SEND TO THIS SYSTEM OWNER.</li>
                                        <li>SALE WILL AUTOMATICALLY END AFTER SOME TIME.</li>
                                        <li>MUST CHECK ALL THE INFORMATION BEFORE SUBMITTING THE FORM.</li>
                                    </ul>
                                    <br/>
                                </div>
                                

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN ADDRESS</p></div>
                                        <div className="col-md-12">
                                            <input type="text" class="form-control" placeholder="Eg: 0x00000.....000" 
                                                    onChange={(e)=>handleTokenAddress(e.target.value)}>
                                            </input>
                                        </div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the token Address?</summary>
                                        <div className="info2">
                                            You need to paste your Token Address.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div>


                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN NAME</p></div>
                                        <div className="col-md-12">
                                            <input type="text" value={tokendata.token_name} class="form-control" placeholder="Eg: 'MyToken'" disabled={true} 
                                                // onChange={(e)=>{
                                                //     // settokendata({...tokendata, token_name: e.target.value})
                                                //     setTokenDbData({...tokenDbData, token_name: e.target.value})
                                                // }}
                                            >
                                            </input>
                                        </div>
                                    </div>
                                    <details>
                                        <summary class="toggle">How do I enter a Token Name?</summary>
                                        <div class="info2">
                                            Give the Same Token Name. If You provide wrong name then, You will face loss.
                                        </div>
                                    </details>
                                
                                    <br/><br/>
                                </div>
                                
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN DECIMALS</p></div>
                                        <div className="col-md-12">
                                            <input type="number" value={tokendata.decimal_places} class="form-control" placeholder="Eg: 18" disabled={true} 
                                                // onChange={(e)=>{
                                                //     // settokendata({...tokendata, decimal_places: Number(e.target.value)})
                                                //     setTokenDbData({...tokenDbData, decimal_places: Number(e.target.value)})
                                                // }}
                                            >
                                            </input>
                                        </div>
                                    </div>
                                    <details>
                                        <summary class="toggle">What is the Token Decimals?</summary>
                                        <div class="info2">
                                            Give the Same Token Decimals. If You provide wrong Decimals then, You will face loss.
                                        </div>
                                    </details>
                                    <br/><br/>
                                </div>

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN SYMBOL</p></div>
                                        <div className="col-md-12">
                                            <input type="text" value={tokendata.token_symbol} class="form-control" placeholder="Eg: ABC" disabled={true} 
                                                // onChange={(e)=>{
                                                //     // settokendata({...tokendata, token_symbol: e.target.value})
                                                //     setTokenDbData({...tokenDbData, token_symbol: e.target.value})
                                                // }}
                                            >
                                            </input></div>
                                    </div>
                                    <details>
                                        <summary class="toggle">How do I enter a Token Symbol?</summary>
                                        <div class="info2">
                                            Give the Same Token Symbol. If You provide wrong Symbol then, You will face loss.
                                        </div>
                                    </details>
                                    <br/><br/>
                                </div>
                            
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN AMOUNT</p></div>
                                        <div className="col-md-12"><input type="number" class="form-control" placeholder="Eg: 100000000000" onChange={(e)=>settokendata({...tokendata, token_amount: Number(e.target.value)})}></input></div>
                                    </div>
                                    <details>
                                        <summary class="toggle">What does token amount mean?</summary>
                                        <div class="info2">
                                            Token Amount means, How many tokens you want to sell in Pre-Sale.
                                        </div>
                                    </details>
                                    <br/><br/>
                                </div>

                                

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN IMAGE LINK (Optional)</p></div>
                                        <div className="col-md-12"><input type="text" class="form-control" placeholder="Eg: https://www.abc.com/logo.png" onChange={(e)=>settokendata({...tokendata, token_image: e.target.value})}></input></div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the token Image Link?</summary>
                                        <div className="info2">
                                            It is Optional, If you want to show your token logo then you can paste your link here.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div>

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>TOKEN PRICE</p></div>
                                        <div className="col-md-12"><input type="string"  class="form-control" placeholder="Eg: 0.0001" onChange={(e)=>settokendata({...tokendata, token_price: e.target.value})}></input></div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the Token Price?</summary>
                                        <div className="info2">
                                            You need to set Token Price.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div>

                                {/* <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>START TIME</p></div>
                                        <div className="col-md-12">
                                            <input type="datetime-local" class="form-control" onChange={(e)=>settokendata({...tokendata, start_time: convertDate(String(e.target.value)) })}></input>
                                            
                                        </div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the Start Time?</summary>
                                        <div className="info2">
                                            The time when the Pre-Sale will Start.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div> */}

                                
                                
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>CLAIMING TIME</p></div>
                                        <div className="col-md-12">
                                            <input type="datetime-local" class="form-control" onChange={(e)=>settokendata({...tokendata, claiming_time: convertDate(String(e.target.value))})}></input>

                                        </div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the Claim Time?</summary>
                                        <div className="info2">
                                            The time when user can clain their tokens.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div>

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12"><p>END TIME</p></div>
                                        <div className="col-md-12">
                                            <input type="datetime-local" class="form-control" onChange={(e)=>settokendata({...tokendata, end_time: convertDate(String(e.target.value))})}></input>
                                        </div>
                                    </div>
                                    <details>
                                        <summary className="toggle">What is the End Time?</summary>
                                        <div className="info2">
                                            The time when the Pre-Sale will End.
                                        </div>
                                    </details>

                                    <br/><br/>
                                </div>

                                <div className="col-md-12">
                                    <center>
                                        <div className="row">
                                            <div className="col-md-6" style={{paddingBottom:'2%'}}> <button type="button" className="btn btn-primary btn_new" style={{width:'40%',borderRadius:'20px', color:'white',borderColor:'black'}}>Cancel</button></div>
                                            <div className="col-md-6"> <button type="button" className="btn btn-primary btn_new" style={{width:'40%',borderRadius:'20px', color:'white',borderColor:'black'}} onClick={onSubmit}>Create a Private-Sale
                                                {isTransactionInProcess0 && <img width="40px" src={Loader} alt="Loading..." />} 
                                            </button></div>
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



                        
    );
}
export default CreatePreSale;