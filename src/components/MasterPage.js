import  "./style.css";
import React from 'react';
import Main from './Main';
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './Dashboard';
import BuyCredits from "./BuyCredits";
import PreSaleDashboard from "./PreSaleDashboard";
import CreatePreSale from "./CreatePreSale";
import { useStore } from "../context/GlobalState";
import AdminDashboard from "./AdminPanel/AdminDashboard";
import CreateToken from "./CreateToken";
import Account from "./Account";
import Nftstoken from "./Nftstoken";
import NftStudio from "./NftStudio";
import LiveSale from "./LiveSale";
import Help from "./Help";

function MasterPage() {
  const [{user_credits}] = useStore();

  const logout = () => {
    window.localStorage.removeItem('key')
    window.localStorage.removeItem('success')
  }

  return (
    <div>
    { window.localStorage.getItem("success") == "true" ? 
        <div>      
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top justify-content-md-center scrolling">
                <a class="navbar-brand" href="/">Codeless Token Generator</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
        
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item n_link active">
                            <a class="nav-link" href="/dashboard">Dashboard<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item n_link">
                            <a class="nav-link" href="/nftstoken">NFTs</a>
                        </li>
                        {/* <li class="nav-item n_link">
                            <a class="nav-link" href="/help">Help</a>
                        </li> */}
                        <li class="nav-item n_link">
                            <a class="nav-link" href="/accounts">Account</a>
                        </li>
                        <li class="nav-item n_link">
                            <a class="nav-link" href="/presale">Create PrivateSale</a>
                        </li>
                        <li class="nav-item n_link">
                            <a class="nav-link" href="/buycredits">Buy Credits</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style={{marginRight:'3%'}}>
                        <li class="nav-item n_link">
                            <a class="nav-link" > User Credits: {user_credits}</a>
                        </li>
                        <li class="nav-item n_link">
                            <a class="nav-link" href="/" onClick={logout}>Sign out</a>
                        </li>
                    </ul>
                </div>

            </nav>

            <Router>        
                <Routes>
                    <Route path="/" element={<Main/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/accounts" element={<Account/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/buycredits" element={<BuyCredits/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/createTokens" element={<CreateToken/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/presale" element={<CreatePreSale/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/presaleDashobard" element={<PreSaleDashboard/> }></Route>
                </Routes>
                <Routes>
                    <Route path="/adminDashobard" element={<AdminDashboard/> }></Route>
                </Routes>
                <Routes>
                    <Route path="/nftstoken" element={<Nftstoken/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/nftStudio" element={<NftStudio/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/liveSale" element={<LiveSale/>}></Route>
                </Routes>
                {/* <Routes>
                    <Route path="/help" element={<Help/>}></Route>
                </Routes> */}

            </Router> 


            <footer class="page-footer font-small pt-4 bg-dark li-foot">
                <div class="container-fluid text-center text-md-left ">
                    <div class="row" style={{textAlign:"center"}}>
                        <h5 class="text-uppercase" style={{color:"white",width:"100%"}}>Codeless Token Generator</h5>
                    </div>
                    <center>
                        <button type="button" className="btn btn-dark fa fa-facebook btn-foot  btns"></button>
                        <button type="button" className="btn btn-dark fa fa-telegram btn-foot btns"></button>
                        <button type="button" className="btn btn-dark fa fa-twitter btn-foot btns"></button>
                        <button type="button" className="btn btn-dark fa fa-medium btn-foot btns"></button>
                        <button type="button" className="btn btn-dark fa fa-linkedin btn-foot btns"></button>
                    </center>
                </div>
            </footer>
        
        </div>
    


        
        :
             
        <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top justify-content-md-center scrolling">
            <a class="navbar-brand" href="/">Codeless Token Generator</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style={{marginRight:'3%'}}>                
                    <li class="nav-item n_link">
                        <a class="nav-link" href="/login">Sign In</a>
                    </li>
                    <li class="nav-item n_link">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                </ul>
            </div>
        </nav>

           
        <Router>    
            <Routes>
                <Route path="/" element={<Main/>}></Route>
            </Routes>    
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
            <Routes>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
            <Routes>
                <Route path="/presaleDashobard" element={<PreSaleDashboard/> }></Route>
            </Routes>
        </Router> 
                


        <footer class="page-footer font-small pt-4 bg-dark li-foot">
            <div class="container-fluid text-center text-md-left ">
                <div class="row" style={{textAlign:"center"}}>
                    <h5 class="text-uppercase" style={{color:"white",width:"100%"}}>Codeless Token Generator</h5>
                </div>
                <center>
                    <button type="button" className="btn btn-dark fa fa-facebook btn-foot  btns"></button>
                    <button type="button" className="btn btn-dark fa fa-telegram btn-foot btns"></button>
                    <button type="button" className="btn btn-dark fa fa-twitter btn-foot btns"></button>
                    <button type="button" className="btn btn-dark fa fa-medium btn-foot btns"></button>
                    <button type="button" className="btn btn-dark fa fa-linkedin btn-foot btns"></button>
                </center>
            </div>
        </footer>
               
    </div>

    }

</div>
  );
}

export default MasterPage;
