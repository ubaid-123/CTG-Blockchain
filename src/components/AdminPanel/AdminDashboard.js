import React from 'react';
import { useStore } from "../../context/GlobalState";
import { CChart } from '@coreui/react-chartjs';
import { changeCreditRate, changeNftCreditRate, changePrivateSaleCreditRate, changeMintableCreditRate, changeBurnableCreditRate, changePauseableCreditRate, changeTaxableCreditRate, changeOwnerAccount } from '../../store/asyncActions'
import { useState } from 'react';
import Loader from '../../images/loader.gif';
import { useEffect } from 'react';

function AdminDashboard(){
    const [{userss, accounts, creditRate, nftCreditRate, privateSaleCreditRate, privateSaleContract, totalSales, mintableFeeRate, burnableFeeRate, pauseableFeeRate, taxableFeeRate, ownerAccount },dispatch] = useStore();
    const [creditValue, setCreditValue] = useState(0);
    const [nftCreditValue, setNftCreditValue] = useState(0);
    const [privateSaleCreditValue, setPrivateSaleCreditValue] = useState(0);
    const [mintableCreditValue, setMintableCreditValue] = useState(0);
    const [burnableCreditValue, setBurnableCreditValue] = useState(0);
    const [pauseableCreditValue, setPauseableCreditValue] = useState(0);
    const [taxableCreditValue, setTaxableCreditValue] = useState(0);
    const [ownerAccValue, setOwnerAccValue] = useState('');
    
    const [isTransactionInProcess0, setTransactionInprocess0] = useState(false);
    const [isTransactionInProcess1, setTransactionInprocess1] = useState(false);
    const [isTransactionInProcess2, setTransactionInprocess2] = useState(false);
    const [isTransactionInProcess3, setTransactionInprocess3] = useState(false);
    const [isTransactionInProcess4, setTransactionInprocess4] = useState(false);
    const [isTransactionInProcess5, setTransactionInprocess5] = useState(false);
    const [isTransactionInProcess6, setTransactionInprocess6] = useState(false);
    const [isTransactionInProcess7, setTransactionInprocess7] = useState(false);


    const handleChangeCreditRate = async ()=> {
        try {
            if(creditValue > 0 && creditRate != creditValue){
                setTransactionInprocess0(true);
                await changeCreditRate(privateSaleContract, creditValue, accounts, dispatch);
                setTransactionInprocess0(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess0(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangeNftCreditRate = async ()=> {
        try {
            if(nftCreditValue > 0 && nftCreditRate != nftCreditValue){
                setTransactionInprocess1(true);
                await changeNftCreditRate(privateSaleContract, nftCreditValue, accounts, dispatch);
                setTransactionInprocess1(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess1(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangePrivateSaleCreditRate = async ()=> {
        try {
            if(privateSaleCreditValue > 0 && privateSaleCreditRate != privateSaleCreditValue){
                setTransactionInprocess2(true);
                await changePrivateSaleCreditRate(privateSaleContract, privateSaleCreditValue, accounts, dispatch);
                setTransactionInprocess2(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess2(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangeMintableCreditRate = async ()=> {
        try {
            if(mintableCreditValue > 0 && mintableFeeRate != mintableCreditValue){
                setTransactionInprocess3(true);
                await changeMintableCreditRate(privateSaleContract, mintableCreditValue, accounts, dispatch);
                setTransactionInprocess3(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess3(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangeBurnableCreditRate = async ()=> {
        try {
            if(burnableCreditValue > 0 && burnableFeeRate != burnableCreditValue){
                setTransactionInprocess4(true);
                await changeBurnableCreditRate(privateSaleContract, burnableCreditValue, accounts, dispatch);
                setTransactionInprocess4(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess4(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangePauseableCreditRate = async ()=> {
        try {
            if(pauseableCreditValue > 0 && pauseableFeeRate != pauseableCreditValue){
                setTransactionInprocess5(true);
                await changePauseableCreditRate(privateSaleContract, pauseableCreditValue, accounts, dispatch);
                setTransactionInprocess5(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess5(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangeTaxableCreditRate = async ()=> {
        try {
            if(taxableCreditValue > 0 && taxableFeeRate != taxableCreditValue){
                setTransactionInprocess6(true);
                await changeTaxableCreditRate(privateSaleContract, taxableCreditValue, accounts, dispatch);
                setTransactionInprocess6(false);
            }else{
                alert("Invalid Credit Value!");
            }
        }catch (error){
            setTransactionInprocess6(false);
            console.log("error trax = ",error);
        }
    }

    const handleChangeOwnerAccount = async ()=> {
        try {
            if(ownerAccValue != '' && ownerAccValue != ownerAccount){
                setTransactionInprocess7(true);
                await changeOwnerAccount(privateSaleContract, ownerAccValue, accounts, dispatch);
                setTransactionInprocess7(false);
            }else{
                alert("Invalid Owner Account Value!");
            }
        }catch (error){
            setTransactionInprocess7(false);
            console.log("error trax = ",error);
        }
    }

    const [tokensCount, setTokensCount] = useState(0);
    const [nftCount, setNftCount] = useState(0);

    useEffect(()=>{
        var months  = {
            "Jan" :0, 
            "Feb" :0, 
            "Mar" :0, 
            "Apr" :0, 
            "May" :0, 
            "Jun" :0, 
            "Jul" :0, 
            "Aug" :0, 
            "Sep" :0, 
            "Oct" :0, 
            "Nov" :0, 
            "Dec" :0
        };
        
        var objKeys = Object.keys(userss);
        var monthKeys = Object.keys(months);

        var tempTokensCount = 0;
        var tempnftCount = 0;

        for(var i = 0; i < Object.keys(userss).length; i++){
            const usrObj = userss[objKeys[i]];
            try{
                tempnftCount +=  usrObj.nfts.length;
                tempTokensCount +=  usrObj.tokens.length;

                // console.log("monthKeys : ", String(usrObj.date).substring(4,7))
                for(var j = 0; j < monthKeys.length; j++){
                    if(String(usrObj.data).toString() != undefined){
                        
                        // if(monthKeys[j] == String(usrObj.date).substring(4,7)){
                        //     months[monthKeys[j]] += 1;
                        // }

                        console.log('monthKeys : ', monthKeys[j])
                    }
                }
            }catch(error){
                continue;
            }
        }
        console.log("months: ", months)
        // console.log('tempTokensCount: ', tempTokensCount)
        setTokensCount(tempTokensCount);
        setNftCount(tempnftCount);

    })

    return(

       
        <div className="height-100 ">
            <br/><br/><br/>
            <h4 style={{fontSize:'40px'}}><center>ADMIN DASHBOARD</center></h4>
            <div className="container">
                <br/><br/>    
                <div className="row">
                    
                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{Object.keys(userss).length}</span>
                            <span className="count-name">Total Users</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{tokensCount}</span>
                            <span className="count-name">Tokens Generated</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{nftCount}</span>
                            <span className="count-name">NFTs Generated</span>
                        </div>
                    </div>

                </div>
                <br/><br/>
                <div className="row">

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{totalSales}</span>
                            <span className="count-name">PrivateSale Created</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">1</span>
                            <span className="count-name">Live Sales</span>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">2</span>
                            <span className="count-name">Pending Sales</span>
                        </div>
                    </div>

                    

                </div>
                <br/><br/>
                <div className="row">

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{creditRate}</span>
                            <span className="count-name">Credit Rate</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{nftCreditRate}</span>
                            <span className="count-name">NFT Credit Fee</span>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card-counter">
                            <span className="count-numbers">{privateSaleCreditRate}</span>
                            <span className="count-name">Private Sale Credit Fee</span>
                        </div>
                    </div>

                    

                </div>

                <br/><br/><br/><br/>
                
                <h2>User Data</h2>
                <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(userss).map((key) => {
                                
                                return (<tr>
                                    <td>{userss[key].email}</td>
                                    <td>{userss[key].username}</td>
                                    <td>{userss[key].credits}</td>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>

           

            <CChart
                type="bar"
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'User Registration',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                    ],
                }}
                labels="months" style={{width: "60%"}}
            />

          
            <CChart
            type="line" 
            data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                {
                    label: "PrivateSale",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: [2, 0, 3, 5, 1, 7, 5, 3, 8]
                },
                ],
            }} style={{width:"60%"}}
            />

            <br/><br/>

            {/* Change Owner Acoount*/}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Owner Account</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter account"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setOwnerAccValue(e.target.value)}
                    />
                    
                </div>
                <button type="button" onClick={handleChangeOwnerAccount} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess7 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>


            {/* Change Credit Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Credit Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setCreditValue(e.target.value)}
                    />
                    
                </div>
                <button type="button" onClick={handleChangeCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess0 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>
            
            {/* Change NFT Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change NFT Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setNftCreditValue(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleChangeNftCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess1 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>


            {/* Change Private-sale Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Private-Sale Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setPrivateSaleCreditValue(e.target.value)}

                    />
                    
                </div>
                <button type="button" onClick={handleChangePrivateSaleCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess2 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>        


            {/* Change Mintable Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Mintable Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setMintableCreditValue(e.target.value)}

                    />
                    
                </div>
                <button type="button" onClick={handleChangeMintableCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess3 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>     


            {/* Change Burnable Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Burnable Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setBurnableCreditValue(e.target.value)}

                    />
                    
                </div>
                <button type="button" onClick={handleChangeBurnableCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess4 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form> 

            {/* Change Pauseable Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Pauseable Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setPauseableCreditValue(e.target.value)}

                    />
                    
                </div>
                <button type="button" onClick={handleChangePauseableCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess5 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>

            {/* Change Taxable Rate */}
            <form className='container'>
                <div className="form-group">
                    <label htmlFor='changeCreditRate'>Change Taxable Rate</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter rate"
                        style={{
                            width: '50%'
                        }}
                        onChange={(e)=>setTaxableCreditValue(e.target.value)}

                    />
                    
                </div>
                <button type="button" onClick={handleChangeTaxableCreditRate} className='btn' id="submit-btn">
                    Change
                    {isTransactionInProcess6 && <img width="40px" src={Loader} alt="Loading..." />} 
                </button>
                <br/><br/><br/>
            </form>        

            <style>
                {`
                    #submit-btn{
                        background-color: #0D031F;
                        color: white;
                        border: none;
                        // border-radius: 5px;
                        width: 10%;
                        height: 35px;
                    }

                    .table{
                        background-color: #0D031F;
                    }

                    .card-counter{
                        box-shadow: 2px 2px 10px #DADADA;
                        margin: 5px;
                        padding: 20px 10px;
                        background-color: #0D031F;
                        height: 100px;
                        border-radius: 5px;
                        transition: .3s linear all;
                        color: white;
                    }
                    
                    .card-counter:hover{
                        box-shadow: 4px 4px 20px #DADADA;
                        transition: .3s linear all;
                    }
                    
                    .card-counter.primary{
                        background-color: #007bff;
                        color: #FFF;
                    }
                
                    .card-counter.danger{
                        background-color: #ef5350;
                        color: #FFF;
                    }  
                
                    .card-counter.success{
                        background-color: #66bb6a;
                        color: #FFF;
                    }  
                
                    .card-counter.info{
                        background-color: #26c6da;
                        color: #FFF;
                    }  
                
                    .card-counter i{
                        font-size: 5em;
                        opacity: 0.2;
                    }
                
                    .card-counter .count-numbers{
                        position: absolute;
                        right: 35px;
                        top: 20px;
                        font-size: 32px;
                        display: block;
                    }
                
                    .card-counter .count-name{
                        position: absolute;
                        right: 35px;
                        top: 65px;
                        font-style: italic;
                        text-transform: capitalize;
                        opacity: 0.8;
                        display: block;
                        font-size: 18px;
                    }
                `}
            </style>

        </div>
    );
}

export default AdminDashboard;