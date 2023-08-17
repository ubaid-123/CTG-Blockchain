import "./style.css"
import {useStore} from "../context/GlobalState";
import React,{useState} from "react";
import {buyCredits} from '../store/asyncActions'
import Loader from '../images/loader.gif';


function BuyCredits(){
  
  const [credit,setcredit] = useState(0)
  const [{user_credits, creditRate}] = useStore()
  const [{accounts}] = useStore();

  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful , setTransactionSuccessful] = useState(false);
  const [transactionError , setTransactionError] = useState("");
    
  const handleSubmit = async () => {
    console.log("credit : ", credit)
    console.log("creditRate : ", creditRate)

    let amount = credit * Number(creditRate);
    amount = amount/10;
    console.log(amount/10)

    try {
        setTransactionInprocess(true)
        console.log("isTransactionInProcess: ", isTransactionInProcess);

        const newTransaction = {
         credit: credit,
         amount: amount
        }
        console.log("trx obj ",newTransaction)
        await buyCredits(accounts,newTransaction);
        setTransactionInprocess(false);
        setTransactionSuccessful(true);
        // window.location.reload();
      }catch (error){
          setTransactionInprocess(false);
          setTransactionSuccessful(false);
          setTransactionError(error.message); 
          console.log("error trax = ",error);
      }
  }
  
 
  return(
     
    <div className="body">
      <div className="container body1" style={{color:"white"}}>
      
      <h3 style={{ margin:"10% 0 5% 0", color:"white"}}>Buy Credits</h3> 
         <p style={{color:"white"}}>You need to purchase credits to use the TokenMaker live service.</p>
         <ul className="list-group list-group-flush"> 
           <li className="list-group-item" style={{borderBottomLeftRadius:"16px",borderRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> You have <b>{user_credits}</b> credits. One credit costs <b>0.01</b> ETH. </li>
        </ul>
        <br/>
         <center><h4 style={{color:"white"}}>How much do I need to pay?</h4></center>
         <div className="row justify-content-center" style={{color:'white'}}>
            <div className="col-md-12" style={{borderBottomLeftRadius:"16px",borderRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)',padding:'2%'}}>
              <center>
                <p style={{fontSize:'24px'}}>Ethereum ERC20 tokens</p>
                <h2>0.1 ETH</h2>
                <p><b>10 credits</b></p>
              </center>
            </div>
            
        </div>
        <br/>
        <ul className="list-group list-group-flush"> 
           <li className="list-group-item" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> <h5>1. Deposit ETH to receive your credits</h5> </li>
           <li className="list-group-item" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> 
           <center>
           <h3> Pay ETH to Receive Credits:</h3> 
           <div className="form-group" style={{width:'40%', borderRadius:'20px'}}>
             <input type="number" className="form-control" placeholder="Enter Credits Amount" onChange={(e)=>setcredit(e.target.value)}/> 
          </div>
          
          <div>
            <button type="button" className="btn btn-primary btn_new" style={{width:'40%', borderRadius:'20px', color:'white',borderColor:'black'}} onClick={handleSubmit}>
              Buy Credits
              {isTransactionInProcess == true && <img width={40} src={Loader} alt="Loading..." />} 
              {isTransactionSuccessful == true ? <div style={{color:"green"}}></div>:null}   
              {!isTransactionSuccessful && <div style={{color:"red"}}>{transactionError}</div>}
            </button>
            
          </div>

         </center>
          <br/>
          <p style={{fontSize:'16px'}}>Credits cost 0.01 ETH, so you need to deposit a minimum of 0.01 ETH to receive 1 credit. If you want to buy more than one credit, deposit a multiple of 0.01 ETH.</p>
          <p style={{fontSize:'16px'}}><b>40 credits</b> entitles you to create fungible, tradeable Ethereum ERC20 tokens and mint a maximum of 100 billion tokens of that type, and transfer those tokens from TokenMaker.org to your personal Ethereum wallet.</p>
           </li>
        </ul>
          <br/>
         
         <ul className="list-group list-group-flush"> 
           <li className="list-group-item" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> <h5> 2. Wait for your TokenMaker account to be credited</h5> </li>
           <li className="list-group-item" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> 
           <div style={{fontSize:'18px'}}>Wait for the transaction to clear. This can take up to 5 minutes. Refresh this page until the Credits shown at the top of the page.</div>
           </li>
        </ul> 
        <br/>
         <ul className="list-group list-group-flush"> 
           <li className="list-group-item" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> <h5> 3. Deploy and Mint ERC20 tokens</h5> </li>
           <li className="list-group-item" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px",backgroundColor: 'rgba(255,255,255,0.1)'}}> 
           <div>
           <p>Go to the dashboard and click <b>CREATE TOKENS</b>. Fill in the fields and select the <b>MainNet</b> Network.</p>
           <p>Click <b>CREATE A NEW TOKEN CONTRACT</b> to create a token contract for your unique tokens.</p>
           <p>Click <b>DEPLOY CONTRACT</b> to deploy the token contract to MainNet.</p>
           <p><b>Wait for the contract to deploy.</b> (This usually takes a few minutes).</p>
           <p>The token status will appear as <b>DEPLOYED</b> in the dashboard.</p>
           <p>Next, click <b>MINT TOKENS</b> to mint your tokens.</p>
           <p><b>Wait for the tokens to mint.</b> (This usually takes a few minutes).</p>
           <p>The token will appear as <b>MINTED</b> in the dashboard.</p>
           </div>
           </li>
        </ul> 

        <br/> 
        
      
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
export default BuyCredits;