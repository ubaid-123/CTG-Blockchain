import './style.css';
import React,{useState,useEffect} from 'react';
import {useStore} from "../context/GlobalState";
import { Modal } from 'react-bootstrap';
import { DeployToken } from '../store/asyncActions'
import { ERC20_TRANSFER_ABI } from '../contract/ERC20SmartContract';
import { TransferERC20Token } from '../store/asyncActions';
import  Loader  from '../images/loader.gif';

function Dashboard(){
    const [{user_credits,accounts,initialFieldValues, mintableFeeRate, burnableFeeRate, pauseableFeeRate, taxableFeeRate}, dispatch] = useStore()
    const [values, setValues] = useState({})
    const [show, setShow] = useState(false)
    const [tax, setTax] = useState(false)
    const [mintable, setMintable] = useState(false)
    const [burnable, setBurnable] = useState(false)
    const [pauseable, setPauseable] = useState(false)
    const [charityTax, setCharityTax] = useState(false);
    const [marketingTax, setMarketingTax] = useState(false);

    const [tokenSymbol, setTokenSymbol] = useState('');
    const [charityOrMarketingTax, setCharityOrMarketingTax] = useState(0);
    const [charityOrMarketingAddress, setCharityOrMarketingAddress] = useState('');
    const [maxTxAmount, setMaxTxAmount] = useState(0);
    
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    const [isTransactionSuccessful , setTransactionSuccessful] = useState(false);
    const [transactionError , setTransactionError] = useState("");

    let setContractType = "";

    useEffect(()=>{
        setValues(initialFieldValues)
        
     },[initialFieldValues])
    

    const handleShow = (symbol) => {
        setShow(true)
        setTokenSymbol(symbol);
    }
    
    const handleClose = () => {
        setShow(false)
    }

    const handleDeploy =  async () => {
       let deduct_credits = Number(0);
        console.log(initialFieldValues)
        for(var i = 0; i < initialFieldValues.tokens.length; i++){
            if(tokenSymbol == initialFieldValues.tokens[i].token_symbol){
                
                if(mintable === false && burnable === false && pauseable === false && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "Basic";
                    deduct_credits+=0;
                }
                else if(mintable === true && burnable === false && pauseable === false && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "Mintable";
                    deduct_credits += Number(mintableFeeRate);
                }
                else if(mintable === false && burnable === true && pauseable === false && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "Burnable";
                    deduct_credits += Number(burnableFeeRate);
                }
                else if(mintable === false && burnable === false && pauseable === true && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "Pauseable";
                    deduct_credits += Number(pauseableFeeRate);
                }
                else if(mintable === true && burnable === true && pauseable === false && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "MintableBurnable";
                    let final = Number(mintableFeeRate) + Number(burnableFeeRate);
                    deduct_credits += Number(final);
                }
                else if(mintable === true && burnable === false && pauseable === true && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "MintablePauseable";
                    let final = Number(mintableFeeRate) + Number(pauseableFeeRate);
                    deduct_credits+= Number(final);
                }
                else if(mintable === false && burnable === true && pauseable === true && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "BurnablePauseable";
                    let final = Number(burnableFeeRate) + Number(pauseableFeeRate);
                    deduct_credits += Number(final);
                }
                else if(mintable === true && burnable === true && pauseable === true && tax === false && charityTax === false && marketingTax === false){
                    setContractType = "Advanced";
                    let final = Number(burnableFeeRate) + Number(pauseableFeeRate) + Number(mintableFeeRate);
                    deduct_credits+= Number(final);
                }
                else if(mintable === false && burnable === false && pauseable === false && tax === true && charityTax === true && marketingTax === false){
                  setContractType = "taxWithCharity";
                  deduct_credits+= Number(taxableFeeRate); 
                }
                else if(mintable === false && burnable === false && pauseable === false && tax === true && charityTax === false && marketingTax === true){
                    setContractType = "taxWithMarketing";
                    deduct_credits+=Number(taxableFeeRate);
                }

                if(initialFieldValues.credits >= deduct_credits){
                    try{
                        
                        if(setContractType == "taxWithCharity" || setContractType == "taxWithMarketing"){
                            setTransactionInprocess(true);
                            const newTransaction = {
                                chain: initialFieldValues.tokens[i].blockchain,
                                name : initialFieldValues.tokens[i].token_name,
                                symbol: initialFieldValues.tokens[i].token_symbol,
                                decimals: initialFieldValues.tokens[i].decimal_places,
                                supply: initialFieldValues.tokens[i].token_supply,
                                charityOrMarketingTax:  charityOrMarketingTax,
                                charityOrMarketingAddress : charityOrMarketingAddress,
                                maxTxAmount: maxTxAmount,
                                contractType : setContractType,
                                deduct_credits: deduct_credits
                            }
                            await DeployToken(newTransaction, dispatch);
                            // alert("Token Deployed Successfully!")
                            setTransactionInprocess(false);
                            setTransactionSuccessful(true);
                        }
    
                        else{
                            setTransactionInprocess(true);
                            const newTransaction = {
                                name : initialFieldValues.tokens[i].token_name,
                                symbol: initialFieldValues.tokens[i].token_symbol,
                                decimals: initialFieldValues.tokens[i].decimal_places,
                                supply: initialFieldValues.tokens[i].token_supply,
                                contractType : setContractType,
                                chain: initialFieldValues.tokens[i].blockchain,
                                deduct_credits: deduct_credits
                            }
                            await DeployToken(newTransaction, dispatch);
                            alert("Token Deployed Successfully!")
                            setTransactionInprocess(false);
                            setTransactionSuccessful(true);
                        }
    
                    }catch (error){
                        console.log("error trax = ",error);
                        setTransactionInprocess(false);
                        setTransactionSuccessful(false);
                        setTransactionError(error.message);   
                    }
                }else{
                    alert("You have not enough credits!");
                }
            }
        }

        
    }

    const handleTransfer = async (symbol) => {
      
        if(initialFieldValues.eth_address == ""){
            alert("You need to set account address!")
        }
        else{

            try{
                for(var i = 0; i < initialFieldValues.tokens.length; i++ ){
                    if(symbol == initialFieldValues.tokens[i].token_symbol){
                        
                        const newTransaction = {
                            chain: initialFieldValues.tokens[i].blockchain,
                            symbol: initialFieldValues.tokens[i].token_symbol,
                            contract: initialFieldValues.tokens[i].contract_address,
                            amount: initialFieldValues.tokens[i].token_supply,
                            abi: ERC20_TRANSFER_ABI,
                            account: initialFieldValues.eth_address, 
                            decimals: initialFieldValues.tokens[i].decimal_places
                        }
                        console.log(newTransaction)
                        setTransactionInprocess(true);
                        await TransferERC20Token(newTransaction, dispatch);
                        setTransactionInprocess(false);
                        setTransactionSuccessful(true);
                    }
                }
            } catch(error){
                console.log("error trax = ",error);
                setTransactionInprocess(false);
                setTransactionSuccessful(false);
                setTransactionError(error.message);   
           }
        }
    }

  return (
  <div>    
    <div className="body">
        <div className="container body1">
            <div className="row">
                <div className="col-md-12">
                    <br></br>
                    <h3 style={{ margin:"10% 0 5% 0", color:"white"}}>Dashboard</h3>  
                    
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d_li" style={{borderTopLeftRadius:"16px",borderTopRightRadius:"16px"}}> <a href="/buycredits" style={{color:"black"}}><b>Buy credits.</b></a> You have {user_credits} credits. To purchase more, deposit ETH to your account.</li>
                        <li className="list-group-item d_li" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px"}}> <b><a href="/createtokens" style={{color:"black"}}>Create token.</a> </b> Make a new token.</li>  
                        <br/>
                        <li className="list-group-item d_li" style={{borderBottomLeftRadius:"16px",borderBottomRightRadius:"16px",borderTopLeftRadius:"16px",borderTopRightRadius:"16px"}}> <b>Note: </b> After click on the Deploy and Transfer Button, You have to wait for 60 seconds to complete the transaction and You will receive the confirmation alert.</li>  
                        
                    </ul>
                </div>
            </div>
            
            <div className="row d_top">
                <div className="col-sm" >
                    <table className="table table-hover table-dark table-responsive-md" style={{borderRadius:"5px"}}>
                        <thead>
                            <tr>
                            <th scope="col">NETWORK</th>
                            <th scope="col">SYMBOL</th>
                            <th scope="col">NAME</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">CONTRACT</th>
                            <th scope="col">SUPPLY</th>
                            <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                             initialFieldValues.tokens != null ?  
                             initialFieldValues.tokens.map((key) => ( 
                                key.token_name != "" ?          
                            <tr>   
                            <th scope="row">{key.blockchain}</th>
                            <td>{key.token_symbol}</td>
                            <td>{key.token_name}</td>
                            <td>{key.status}</td>
                            <td style={{color : 'white'}}>{key.contract_address != "" ? String(key.contract_address) : "---"}</td>
                            <td>{key.token_supply}</td>
                            <td>{key.status === "Created" ?  <button className="btn btn-dark btn-sm" style={{borderColor:'white', color:'white'}} onClick={()=>handleShow(key.token_symbol)}>Deploy</button> : 
                              key.status === "Deployed" ? 
                                <div>
                                    <button className="btn btn-dark btn-sm" style={{borderColor:'white' , color:'white'}} onClick={()=>handleTransfer(key.token_symbol)}>
                                        Transfer
                                    </button> 
                                    {isTransactionInProcess && <img width="400px" src={Loader} alt="Loading..." />} 
                                    {isTransactionSuccessful == true ? <div style={{color:"green"}}></div>:null}   
                                    {!isTransactionSuccessful && <div style={{color:"red"}}>{transactionError}</div>}
                                </div> : <div style={{fontSize:'16px',paddingLeft:'15%'}}>Transfered</div>
                             }</td>
                            </tr> : null
                             )) : null}  
                         </tbody>
                    </table>
                </div>
            </div>

            

            <div className="row d_div" style={{color:"white", margin:"5% 0"}}>
                <p className="pa1" style={{paddingRight:"50%"}}>TO CREATE AND TRANSFER A TOKEN:</p>
                <p>Click CREATE TOKENS. Enter a Name, Token Symbol, Total Supply and Decimals.</p>
                <p>Click CREATE A NEW TOKEN CONTRACT to create a token contract for your unique tokens.</p>
                <p>Click DEPLOY CONTRACT to deploy the token contract to MainNet.</p>
                <p>Click TRANSFER to transfer the tokens to your wallet address. </p>
                <p>In Metamask, add the token contract address to your wallet (see below). Your tokens are now available to use!</p>
                <p>Wait for the contract to deploy and transfer the tokens to your wallet address. (This usually takes a few minutes).</p>
                <p>The token status will appear as DEPLOYED in the dashboard.</p>
                <p>The token status will appear as TRANSFERRED in the dashboard.</p>
            </div>

            

    <br></br>
    <br></br>
    <br></br>
    <br></br>

        </div>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <div style={{fontSize:'24px'}}><b>Select Token Type</b></div>
        </Modal.Header>

        <Modal.Body>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                    <p>Note: If You want to deploy Basic Token then just Click on Deploy Button </p>
                    <div className="input-group form-group" style={{fontSize:"20px"}}>
                    <input type="checkbox" style={{width:"20px",height:"20px"}} className="form-check-input" id="Mintable" name="Mintable"
                       onChange={()=>setMintable(!mintable)}
                    />
                    <label htmlFor="Mintable" style={{marginLeft:"1.5%"}} className="form-check-label" >Mintable &nbsp;&nbsp;(+{mintableFeeRate} Credits)</label>
                    </div>

                    <div className="input-group form-group" style={{fontSize:"20px"}}>
                        <input type="checkbox" style={{width:"20px",height:"20px"}} className="form-check-input" id="Burnable" name="Burnable" 
                            onChange={()=>setBurnable(!burnable)}
                        />
                        <label htmlFor="Burnable" style={{marginLeft:"1.5%"}} className="form-check-label" >Burnable &nbsp;&nbsp;(+{burnableFeeRate} Credits)</label>
                    </div>

                    <div className="input-group form-group" style={{fontSize:"20px"}}>
                        <input type="checkbox" style={{width:"20px",height:"20px"}} className="form-check-input" id="Pausable" name="Pausable" 
                            onChange={()=>setPauseable(!pauseable)}
                        />
                        <label htmlFor="Pausable" style={{marginLeft:"1.5%"}} className="form-check-label" >Pausable &nbsp;&nbsp;(+{pauseableFeeRate} Credits)</label>
                    </div>

                    <div className="input-group form-group" style={{fontSize:"20px"}}>
                        <input type="checkbox" style={{width:"20px",height:"20px"}} className="form-check-input" id="Tax" name="Transaction Tax" 
                            onChange={()=>{
                                setTax(!tax);
                                if(tax === false){
                                    document.getElementById("Mintable").disabled = true;    
                                    document.getElementById("Burnable").disabled = true;    
                                    document.getElementById("Pausable").disabled = true;    
                                    
                                    document.getElementById("Mintable").checked = false;    
                                    document.getElementById("Burnable").checked = false;    
                                    document.getElementById("Pausable").checked = false;    
                                    
                                }else{
                                    document.getElementById("Mintable").disabled = false;    
                                    document.getElementById("Burnable").disabled = false;    
                                    document.getElementById("Pausable").disabled = false;
                                    setMarketingTax(false)
                                    setCharityTax(false)
                                }
                                
                                
                            }}
                        />
                    <label htmlFor="Transaction Tax" style={{marginLeft:"1.5%"}} className="form-check-label" >Transaction Tax &nbsp;&nbsp;(+{taxableFeeRate} Credits)</label>
                    </div>

                    <div>
                        {
                            tax === true ? 
                            <div>
                                <p>Note: Mintable, Burnable, and Pauseable functionalities are already included in Taxation Contract.</p>   
                                <div className="form-group form-check">
                                    <input type="radio" className="form-check-input" id="charity" name="tax"
                                        onChange = {()=>{
                                            setCharityTax(!charityTax);
                                            setMarketingTax(false)
                                        }}
                                    />
                                    <label className="form-check-label" for="chairty">Tax with Charity</label>
                                </div>
                                    
                                <div className="form-group form-check">
                                    <input type="radio" className="form-check-input" id="marketing" name="tax"
                                        onChange = {()=>{
                                            setMarketingTax(!marketingTax);
                                            setCharityTax(false);
                                        }}
                                    />
                                    <label className="form-check-label" for="marketing">Tax with Marketing</label>
                                </div>    
                            </div>
                            
                            : null

                        }
                        {
                            charityTax === true ?
                                <form>
                                   <div class="form-group">
                                        <label for="CharityTax">Charity Tax</label>
                                        <input type="number" class="form-control" id="CharityTax" placeholder="Eg: 2" 
                                            onChange = {(e) => setCharityOrMarketingTax(e.target.value)}
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="CharityWallet">Charity Wallet Address</label>
                                        <input type="text" class="form-control" id="CharityWallet" placeholder="Eg: 0x000000000000000000000000000000000000dEaD" 
                                             onChange = {(e) => setCharityOrMarketingAddress(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="maxTx">Max Amount Transaction, If you will provide 5000 then no one can transfer tokens greater than 5000</label>
                                        <input type="number" class="form-control" id="maxTx" placeholder="Eg: 5000" 
                                            onChange = {(e) => setMaxTxAmount(e.target.value)}
                                        />
                                    </div>
                                </form>
                            : null
                        }
                        {
                            marketingTax === true ?
                                <form>
                                    <div class="form-group">
                                        <label for="MarketingTax">Marketing Tax</label>
                                        <input type="number" class="form-control" id="MarketingTax" placeholder="Eg: 2" 
                                            onChange = {(e) => setCharityOrMarketingTax(e.target.value)}
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="MarketingWallet">Marketing Wallet Address</label>
                                        <input type="text" class="form-control" id="MarketingWallet" placeholder="Eg: 0x000000000000000000000000000000000000dEaD" 
                                            onChange = {(e) => setCharityOrMarketingAddress(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="maxTx">Max Amount Transaction, If you will provide 5000 then no one can transfer tokens greater than 5000</label>
                                        <input type="number" class="form-control" id="maxTx" placeholder="Eg: 5000" 
                                            onChange = {(e) => setMaxTxAmount(e.target.value)}
                                        />
                                    </div>
                                </form>
                            : null

                        }
                    </div>

                    </div>
                </div>
            
                <br/><br/>
            </div>
        </Modal.Body>

        <Modal.Footer>
            <div>
                <button className="btn btn-dark" onClick={handleDeploy}>
                    Deploy
                    &nbsp;
                    {isTransactionInProcess && <img width="400px" src={Loader} alt="Loading..." />} 
                    {isTransactionSuccessful == true ? <div style={{color:"green"}}></div>:null}   
                    {!isTransactionSuccessful && <div style={{color:"red"}}>{transactionError}</div>}
                </button>
            </div>
        </Modal.Footer>
    </Modal>

</div>


  )
}
export default Dashboard;


