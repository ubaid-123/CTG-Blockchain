import React, { useEffect, useState } from "react";
import { useStore } from "../context/GlobalState";
import { CheckingDeposit, DoLive, doAllocation, DoEnd, StartClaimingPeriod, doClaim } from "../store/asyncActions"
import Loader from '../images/loader.gif';

function PreSaleDashobard(){
    const [{initialFieldValues, token_name, token_symbol, token_decimals, amount_of_tokens, token_address, claim_time, end_time, token_image,  
        saleStatus, depositChecking, token_price, privateSaleContract, remaining_tokens, userAllocation, accounts}, dispatch] = useStore();
    const [values, setValues] = useState({})
    const [isTransactionInProcess0, setTransactionInprocess0] = useState(false);
    const [isTransactionInProcess1, setTransactionInprocess1] = useState(false);
    const [saleEnd, setSaleEnd] = useState(false); 
    const [amount, setAmount] = useState(0);
    // console.log("saleStatus : ", saleStatus)

    useEffect(()=>{
        
        setValues(initialFieldValues);

    },[initialFieldValues])


    const handleBuy = async ()=>{
        var todayDateTime = new Date();
        var todayYear = String(todayDateTime.getFullYear());
        var todayMonth = String(todayDateTime.getMonth()+1);
        var todayDate = String(todayDateTime.getDate());
        var todayDate = String(todayYear + "-" + todayMonth + "-" + todayDate);

        var todayHour = String(todayDateTime.getHours());
        var todayMinutes = String(todayDateTime.getMinutes());
        var todayTime = "T"+todayHour + ":" +todayMinutes;    

        var final = todayDate + todayTime;

        if(saleStatus == 1){
            if(amount > 0 && amount <= remaining_tokens){
                if(convertDate(final) <= claim_time){
                    // if(isSaleLive == "true"){
                        try{
                            setTransactionInprocess0(true)
                            const newTransaction = {
                                amount: amount
                            }
                            await doAllocation(privateSaleContract, newTransaction, accounts, dispatch);
                            // window.location.reload();
                            setTransactionInprocess0(false);
                        }
                        catch(error){
                            setTransactionInprocess0(false);
                            console.log(error)
                        }
                    // }else{
                    //     alert("Sale is not live.")
                    // }
                }else{
                    alert("Buy Time is finished.");
                }
            }else{
                alert("You are passing wrong value.");
            }
        }else{
            alert("Sale is in Pending.");
        }
        
    }

    function convertDate(date){
        var dateTimeParts = String(date).split('T')
        var timeParts = String(dateTimeParts[1]).split(':')
        var dateParts = String(dateTimeParts[0]).split('-')
        
        date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);
        return String(date.getTime()/1000);
    }    

    function convertTimestampToDate(timestamp){
        var date = new Date(timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = date.getMinutes();
        return String(date.toLocaleDateString("en-US") + " " + hours + ":" + minutes);
        
    }

    function addminutestoTimestamp(timestamp, minutes){
        if(timestamp != 0){
            var date = new Date(timestamp * 1000);
            var newDate = new Date(date.getTime() + minutes * 60000).getTime()/1000;
            return String(newDate);
        }
    }

   

    // let flag = 0; 
    
    useEffect(()=>{
        const timer = setInterval(async ()=>{
            //console.log("token_name : ", token_name);
            // if(token_name != "" && flag == 0){
            //     await CheckingDeposit(privateSaleContract, dispatch)
                
            //     if(depositChecking == "true" && isSaleLive == "false" && isSalePending == "true"){
            //         await DoLive(privateSaleContract, dispatch);
            //         flag = 1;
            //         clearInterval(timer);
            //     }
            // }
            // else{
            //     console.log("NO SALE.");    
            // }
            
            if(Number(claim_time) != 0 && Number(end_time) != 0){
                var todayDateTime = new Date();
                var todayYear = String(todayDateTime.getFullYear());
                var todayMonth = String(todayDateTime.getMonth()+1);
                var todayDate = String(todayDateTime.getDate());
                var todayDate = String(todayYear + "-" + todayMonth + "-" + todayDate);

                var todayHour = String(todayDateTime.getHours());
                var todayMinutes = String(todayDateTime.getMinutes());
                var todayTime = "T"+todayHour + ":" +todayMinutes;    

                var final = todayDate + todayTime;
                // console.log('final: ' ,final)
                if(saleStatus == 1){
                    if(addminutestoTimestamp(Number(claim_time), 1) <= convertDate(final)){
                        await StartClaimingPeriod(privateSaleContract, dispatch);
                        //window.location.reload();
                        console.log("CLAIM TIME STARTED!");
                        clearInterval(timer);
                    }else{
                        console.log(addminutestoTimestamp(Number(claim_time), 3) <= convertDate(final))
                        console.log(addminutestoTimestamp(Number(claim_time), 3))
                        console.log(convertDate(final))
                    }
                }
                else if(saleStatus == 2){
                    if(addminutestoTimestamp(Number(end_time), 1) <= convertDate(final)){
                        await DoEnd(privateSaleContract, dispatch);
                        const timeout = setTimeout(()=>{

                            window.location.reload();
                        },2000)
                        clearTimeout(timeout)
                        console.log("SALE FINISHED");
                        clearInterval(timer);
                    }
                }
                else if(saleStatus == 3){
                    setSaleEnd(true);
                }
                else{
                    console.log("SALE RUNNING", addminutestoTimestamp(Number(end_time), 5));
                }
            }

        },8000);
    },[token_name, saleEnd])
    
    
    
    const onClaim = async ()=>{
        var todayDateTime = new Date();
        var todayYear = String(todayDateTime.getFullYear());
        var todayMonth = String(todayDateTime.getMonth()+1);
        var todayDate = String(todayDateTime.getDate());
        var todayDate = String(todayYear + "-" + todayMonth + "-" + todayDate);

        var todayHour = String(todayDateTime.getHours());
        var todayMinutes = String(todayDateTime.getMinutes());
        var todayTime = "T"+todayHour + ":" +todayMinutes;    

        var final = todayDate + todayTime;
        
        if(convertDate(final) < addminutestoTimestamp(Number(end_time), 1) && convertDate(final) > claim_time){
            // if(addminutestoTimestamp(Number(end_time), 3) >= convertDate(final)){
                setTransactionInprocess1(true)
                await doClaim(privateSaleContract, accounts, dispatch);
                alert("claimed");
                setTransactionInprocess1(false)
                window.location.reload();
            // }
            // else{
            //     alert("Claim time is finish. Now you will receive automatically.");
            // }        
        }   
        else{
            alert("You can not claim this time");   
        } 
    }


    return (
        <div>
            <div className="body">
                <div className="container body1">
                    <br/><br/>
                    { token_name != "" && saleEnd == false ? 
                        <div>
                            <br/><br/>
                            <div className="col-md-12" style={{color: 'white'}}>
                                    <h6>IMPORTANT POINTS: </h6>
                                    <ul>
                                        <li>THIS FEATURE IS ONLY FOR AVAX TOKENS.</li>
                                        <li>YOU NEED TO SET YOUR METAMASK WALLET NETWORK TO AVAX.</li>
                                        <li>YOU CAN BUY TOKENS BEFORE END THE SALE.</li>
                                        <li>IF YOU WILL TRY TO BUY AFTER END TIME, THEN YOU WILL LOSS YOUR GAS FEE.</li>
                                        <li>AFTER THE SALE END TIME, YOU CAN CLAIM YOUR TOKENS IN 15 MINUTES.</li>
                                        <li>IF YOU WILL NOT CLAIM, THEN AFTER THE END OF SALE YOU WILL AUTOMATICALLY RECEIVE YOUR TOKENS.</li>
                                        <li>SALE WILL AUTOMATICALLY END AFTER SOME TIME.</li>
                                        <li>IF THE SALE IS IN PENDING, DO NOT TRY TO BUY.</li>
                                    </ul>
                                    <br/>
                                </div>
                            <center>
                                <div className="row main-box" style={{marginTop:"3%"}}>
                                
                                    <div className="col-sm rounded pd">
                                        <div className="row" style={{textAlign:"left"}}>
                                            <h6 className="main_h6"><div style={{display:"inline"}}><img src={token_image} className="token-img" style={{paddingRight:"5px" }}/></div>Token Name : {token_name}</h6>
                                            <h6 className="main_h6">Token Info:</h6>
                                            <div className="row">
                                                <div className="row box2">
                                                    <p className="col-sm-6 main_pa1">SYMBOL: <p className="main_pa1">{token_symbol}</p></p>
                                                    <p className="col-sm-6 main_pa1">DECIMALS: <p className="main_pa1">{token_decimals}</p></p>
                                                </div>
                                                <div className="row box2">                                           
                                                    <p className="col-sm-6 main_pa1">Amount of Tokens: <p className="main_pa1">{parseFloat(amount_of_tokens)}</p></p>
                                                    <p className="col-sm-6 main_pa1">Remaining Tokens:  <p className="main_pa1">{parseFloat(remaining_tokens)}</p></p>
                                                </div>
                                                <div className="row box2">
                                                    <p className=" col-sm-6 main_pa1">Claim Time: <p className="main_pa1">{convertTimestampToDate(Number(claim_time))}</p></p>
                                                    <p className=" col-sm-6 main_pa1">End Time: <p className="main_pa1">{convertTimestampToDate(Number(end_time))}</p></p>
                                                </div>
                                                <div className="row box2">
                                                    <p className=" col-sm-6 main_pa1">
                                                        Sale Status: 
                                                        <p className="main_pa1">
                                                            {saleStatus == 0 ? "Pending" : saleStatus == 1 ? "Live" : saleStatus == 2 ? "Claim Period" : "Completed"}
                                                        </p>
                                                    </p>
                                                    <p className="col-sm-6 main_pa1" style={{overflow:"hidden"}}>Token Address:  <p className="main_pa1">{String(token_address).slice(0,7) + "..............." +String(token_address).slice(35,String(token_address).length)}</p></p>
                                                </div>
                                                <div className="row box2">
                                                    <p className=" col-sm-6 main_pa1">Token Price: <p className="main_pa1">{token_price / (10 ** 18)}</p></p>
                                                    <p className="col-sm-6 main_pa1">Your Allocation:  <p className="main_pa1">{userAllocation}</p></p>
                                                </div>
                                                
                                                

                                                <div className="row box2" style={{paddingRight:"3%",paddingBottom:"3%"}}>
                                                    <p className=" col-sm-6 main_pa1">Enter Amount of Tokens: </p>
                                                    <input type="number" style={{marginRight:"3%"}} className="form-control col-sm" 
                                                            onChange={(e)=>setAmount(Number(e.target.value))} 
                                                    />
                                                    <br/>
                                                    <button type="button" id="buy_btn" className="btn btn-primary btn-sm btn_new col-2" style={{width:'10%',height:'65%', borderRadius:'20px', color:'white',borderColor:'black'}} onClick={handleBuy}>
                                                        BUY NOW
                                                        {isTransactionInProcess0 && <img width="40px" src={Loader} alt="Loading..." />} 
                                                    </button>

                                                </div>
                                                <div className="row box2" style={{paddingRight:"3%",paddingBottom:"3%"}}>
                                                            <p className="col-sm-6 main_pa1 col-sm" >Claiming Your Token:</p>
                                                            <button type="button" id="claim" onClick={onClaim} className="btn btn-primary btn-sm btn_new col-sm" style={{width:'10%',height:'80%',borderRadius:'20px', color:'white',borderColor:'black',marginTop:"2%"}}>CLAIM
                                                            {isTransactionInProcess1 && <img width="40px" src={Loader} alt="Loading..." />} 
                                                            </button>
                                                
                                                    

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </center>
                        </div>
                    :
                        <div style={{minHeight:'540px',height:"100%" }}>
                            
                            <center><h1 style={{color: 'white', fontSize: '100px', paddingTop: '20%'}}>NO LIVE SALE</h1></center>

                            
                        </div>
                    }
                </div>
            </div>

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


        </div>
    )

}

export default PreSaleDashobard;



