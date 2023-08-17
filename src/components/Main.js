
import tokenpic from "../images/token.svg";
import distoken from "../images/distoken.svg";
import airdrop from "../images/airdrop.svg"


function Main(){
    


  return (
  <div>
    <div className="main_d2" style={{height:"100%"}}> 
        <div className="container">
            <div className="main_d1 row" >
                <h1 className="main_h1 ">Create crypto tokens with zero code.</h1>
                <h2 className="main_h11">Mint ERC20, BEP20 tokens & NFT's on the blockchain, right now, for free. </h2>
                <br/><br/><br/>
                <center>
                <div className="textArea" style={{paddingBottom:"3%"}} >
                    <p style={{paddingLeft: '20px', paddingRight: '20px' ,textAlign:'justify'}}>
                        Codeless Token Generator is conducting a private-sale of tokens that can be exchanged for services on our site, and with future partners who consume our API as part of a token-based ecosystem.
                        <br/>
                        <br/>
                       
                        <p>Register as a Member to participate in the private-sale.</p>

                    </p>     
                    <br/> 
                    <div className="row main-btn"> 
                        <a href="/presaleDashobard" className="col-lg main_a1 rounded">PRIVATE-SALE DASHBOARD</a>
                    </div>
                </div> 
              
                </center>          
            </div>

            <div className="row" style={{marginTop:"3%"}}>
                <div className="col-md rounded pd">
                    <div className="row">
                        <h6 className="main_h6">ERC20 tokens</h6>
                        <p className="main_pa1">Basic Standard</p>
                        <p className="price_eth">Free forever</p>
                        <p className="price_credit">no credits required</p>
                    </div>
                </div>

                <div className="col-md rounded pd">
                    <div className="row">
                        <h6 className="main_h6">ERC20 tokens</h6>
                        <p className="main_pa1">Mintable Standard</p>
                        <p className="price_eth">0.05 ETH</p>
                        <p className="price_credit">5 credits required</p>
                    </div>
                </div>

                <div className="col-md rounded pd">
                    <div className="row">
                        <h6 className="main_h6">ERC20 tokens</h6>
                        <p className="main_pa1">Taxable Standard</p>
                        <p className="price_eth">0.2 ETH</p>
                        <p className="price_credit">20 credits required</p>
                    </div>
                </div>

                <div className="col-md rounded pd">
                    <div className="row">
                        <h6 className="main_h6">PrivatSale</h6>
                        <p className="main_pa1">Basic Standard</p>
                        <p className="price_eth">0.5 ETH</p>
                        <p className="price_credit">50 credits required</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="row main_d3">
            <div className="container d3_1">
                <div className="col-sm fbox">
                    <img alt="Mint your ERC20 token" src={tokenpic} width="120px"/> 
                    <p>Mint your own ERC20 token</p>
                </div>
                <div className="col-sm fbox">
                    <img alt="Distribute tokens to other parties" src={distoken} width="120px"/> 
                    <p>Distribute tokens to other parties</p>
                </div>
                <div className="col-sm fbox">
                    <img alt="Receive tokens to your private wallet" src={airdrop} width="120px"/> 
                    <p>Receive tokens to your private wallet</p>
                </div>
            </div>      
        </div>

        <div className="row main_d4">
            <div className="container">
                <div className="col-sm txtbox" style={{marginRight:"10px"}}>
                    <p className="pbox">“Customer service beyond my expectations. Highly recommended”</p>
                    <div className="tbox">
                        David Stanton, Founder/CEO<br/>
						SunFarm.io (Zero carbon Solar mining)
					</div>
                </div>
                
                <div className="col-sm txtbox">
                    <p className="pbox">“Seamless experience. I have full control over my tokens”</p>
                    <div className="tbox">
                        BLANK, Visual artist, cliffblank.com<br/>
                        Creator of the “Invest In Artists” series
					</div>
                </div>

                <div className="col-sm txtbox" style={{marginRight:"-5%"}}>
                    <p className="pbox">“A breath of fresh air. So lucky to have found you”</p>
                    <div className="tbox">
                        Erick Sabelskjold<br/>
						VinxCoin, VIneyard Backed Assets
					</div>
                </div>

            </div>      
        </div>

        <div className="row main_d3">
            <div className="container d3_1">
                <div className="col-sm fbox">
                    <h2 className="h2f">No code required</h2>
                    <p className="pinfo">
						Mint your own ERC20 tokens with us and we take care of all the code automatically.
						It takes minutes to set up and you can try it for free, right now.
					</p>
                </div>

                <div className="col-sm fbox">
                    <h2 className="h2f">How do I receive my tokens?</h2>
                    <p className="pinfo">
                    Just tell us your Ethereum wallet address and we'll transfer them to you as soon as they are ready - which usually takes about a minute. If you don’t have a wallet address, you can get one for free (we recommend MetaMask).
					</p>
                </div>

                <div className="col-sm fbox">
                    <h2 className="h2f">How do I get help?</h2>
                    <p className="pinfo">
                    Email us at support@codelesstokengenerator.org or message us on Telegram to get answers to your questions. Our support team will be happy to help you with any questions you might have.
					</p>
                </div>

            </div>      
        </div>

    </div>
    
    <style>
       {` @media only screen and (max-width:400px){
           .main_a1{
               margin-left:15%;
           }
           .textArea{
               width:80%;
           }
           .pd{
            margin-left:20%;
            margin-right:30%;
        }
       }
       
       @media only screen and (max-width:500px){
        .main_a1{
            margin-left:20%;
        }
        .textArea{
            width:80%;
        }
        .pd{
            margin-left:20%;
            margin-right:30%;
        }
    }
    @media only screen and (max-width:800px){
        .main_a1{
            margin-left:20%;
        }
        .pd{
            margin-left:20%;
            margin-right:50%;
        }
    }
       
       
       `}
    </style>
    
    
  </div>
  )

  
}
export default Main;