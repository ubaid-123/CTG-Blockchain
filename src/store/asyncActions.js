import { setupWeb3, addEthereumAccounts,web3LoadingError,getCredits,setUsers,initialFieldValuess,
    setupTokenName, setupTokenSymbol, setupTokenDecimals, setupTokenAmount, setupTokenAddress, setupClaimTime, setupEndTime,
    setupTokenImage, setupSaleStatus, setupRemainingTokens, setupTokenPrice,
    setupUserAllocation, nftSupply, setupContract1, setupPrivateSaleContract, setupDepositChecking,
    setupCreditRate, setupNftCreditRate, setupPrivateSaleCreditRate, setupPrivateSaleTotalSales,
    setupMintableFeeRate, setupBurnableFeeRate, setupPauseableFeeRate, setupTaxableFeeRate, setupOwnerAccount, setupBalanceInEth
} from "./actions";
import Web3 from "web3";
import firebaseDb from "../components/firebase";
import { NFT_ADDRESS, NFT_ABI } from "../contract/ERC721";
import { BASIC_ERC20_BYTECODE, BASIC_ERC20_ABI } from '../contract/BASIC_ERC20';
import { MINTABLE_BYTECODE, MINTABLE_ABI } from '../contract/MINTABLE_ERC20';
import { BURNABLE_BYTECODE, BURNABLE_ABI } from '../contract/BURNABLE_ERC20';
import { PAUSEABLE_BYTECODE, PAUSEABLE_ABI } from '../contract/PAUSEABLE_ERC20';
import { MINTABLE_BURNABLE_BYTECODE, MINTABLE_BURNABLE_ABI } from '../contract/MINTABLE_BURNABLE_ERC20';
import { MINTABLE_PAUSEABLE_BYTECODE, MINTABLE_PAUSEABLE_ABI } from '../contract/MINTABLE_PAUSEABLE_ERC20';
import { BURNABLE_PAUSEABLE_BYTECODE, BURNABLE_PAUSEABLE_ABI } from '../contract/BURNABLE_PAUSABLE_ERC20';
import { ADVANCE_BYTECODE, ADVANCE_ABI } from '../contract/ADVANCE_ERC20';
import { CHARITY_TAX_BYTECODE, CHARITY_TAX_ABI } from '../contract/CHARITY_TAX_ERC20';
import { MARKETING_TAX_BYTECODE, MARKETING_TAX_ABI } from '../contract/MARKETING_TAX_ERC20';
import { PRIVATESALE_ADDRESS, PRIVATESALE_ABI } from '../contract/PrivateSaleContract'

//import { AVAX_MARKETING_TAX_BYTECODE, AVAX_MARKETING_TAX_ABI } from '../contract/';
//import { AVAX_CHARITY_TAX_ABI, AVAX_CHARITY_TAX_BYTECODE } from '../contract/TaxWithCharityAVAXConfig';

import {Buffer} from 'buffer';
import { BigNumber } from 'bignumber.js';

const web3 = new Web3(Web3.givenProvider);
const TestBSCweb3      = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const MainnetBSCweb3   = new Web3("https://bsc-dataseed.binance.org/");
const eth_mainnet_web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// const goerli_web3      = new Web3("https://eth-goerli.g.alchemy.com/v2/koHiB-wRHiXXE0cBrrn2aOuRHF_CEx7R");
const goerli_web3      = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

const account = '0x54Fb943f76Ea7EE2Bae58865Ec6fc9445F7004E0' // ADMIN ACCOUNT ADDRESS
const privateKey = '2139beacfbd5de1a2008b089ef175b5e2160d025d5e6fa610d4ab46396e01882' // WALLET PRIVATE KEY
const privateKeyBuffer = Buffer.from(privateKey,'hex');

let BN;
let BasicERC20Instance;
let MintableInstance;
let BurnableInstance;
let PauseableInstance;
let MintableBurnableInstance;
let MintablePauseableInstance;
let BurnablePauseableInstance;
let AdvanceInstance;
let taxCharityInstance;
let taxMarketingInstance;
// let AVAXtaxMarketingInstance;
// let AVAXtaxCharityInstance;
let nftContract;
let saleId;

export const loadBlockchain = async (dispatch) =>{
    try {
        
        nftContract = new TestBSCweb3.eth.Contract(NFT_ABI,NFT_ADDRESS);
        dispatch(setupContract1(nftContract));
        
        let nftsupply =  await nftContract.methods.totalSupply().call();
        dispatch(nftSupply(nftsupply));

        let privateSaleContract = new TestBSCweb3.eth.Contract(PRIVATESALE_ABI, PRIVATESALE_ADDRESS);
        dispatch(setupPrivateSaleContract(privateSaleContract)); 

        let creditRate =  await privateSaleContract.methods.creditRate().call();
        creditRate = new BigNumber(creditRate/(10**18));
        let nftCreditRate = await privateSaleContract.methods.nftCreditRate().call();
        let privatesaleSaleCreditRate = await privateSaleContract.methods.privatesaleSaleCreditRate().call();
        let totalSales = await privateSaleContract.methods.totalSales().call();
        let mintableCreditRate = await privateSaleContract.methods.mintableCreditRate().call();
        let burnableCreditRate = await privateSaleContract.methods.burnableCreditRate().call();
        let pauseableCreditRate = await privateSaleContract.methods.pauseableCreditRate().call();
        let taxableCreditRate = await privateSaleContract.methods.taxableCreditRate().call();
        let ownerAccount = await privateSaleContract.methods.ownerAccount().call();

        dispatch(setupCreditRate(creditRate.toString()));
        dispatch(setupNftCreditRate(nftCreditRate));
        dispatch(setupPrivateSaleCreditRate(privatesaleSaleCreditRate));
        dispatch(setupPrivateSaleTotalSales(totalSales));
        dispatch(setupMintableFeeRate(mintableCreditRate));
        dispatch(setupBurnableFeeRate(burnableCreditRate));
        dispatch(setupPauseableFeeRate(pauseableCreditRate));
        dispatch(setupTaxableFeeRate(taxableCreditRate));
        dispatch(setupOwnerAccount(ownerAccount));

        loadData(dispatch)

        if(Web3.givenProvider){
    
            Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            BN = web3.utils.BN;
            
            const accounts = await web3.eth.getAccounts();
            console.log('accounts async : ', accounts);
            dispatch(addEthereumAccounts(accounts));
            
            
            
         
            BasicERC20Instance = new web3.eth.Contract(BASIC_ERC20_ABI);
            MintableInstance = new web3.eth.Contract(MINTABLE_ABI);
            BurnableInstance = new web3.eth.Contract(BURNABLE_ABI);
            PauseableInstance = new web3.eth.Contract(PAUSEABLE_ABI);
            MintableBurnableInstance = new web3.eth.Contract(MINTABLE_BURNABLE_ABI);
            MintablePauseableInstance = new web3.eth.Contract(MINTABLE_PAUSEABLE_ABI);
            BurnablePauseableInstance = new web3.eth.Contract(BURNABLE_PAUSEABLE_ABI);
            AdvanceInstance = new web3.eth.Contract(ADVANCE_ABI);
            taxCharityInstance = new web3.eth.Contract(CHARITY_TAX_ABI);
            taxMarketingInstance = new web3.eth.Contract(MARKETING_TAX_ABI);
           
            saleId = await privateSaleContract.methods.totalSales().call({from : account });
            saleId -= 1;
            console.log("saleId : ", saleId)
            let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
            console.log("salesData : ", salesData);
            dispatch(setupTokenName(salesData.tokenName));
            dispatch(setupTokenSymbol(salesData.tokenSymbol));
            dispatch(setupTokenDecimals(salesData.decimals));
            dispatch(setupTokenAmount(salesData.tokenAmount));
            dispatch(setupTokenPrice(salesData.tokenPrice));
            dispatch(setupTokenImage(salesData.imageLink));
            dispatch(setupRemainingTokens(salesData.remainingTokens));
            dispatch(setupTokenAddress(salesData.token));
            dispatch(setupClaimTime(String(salesData.claimingTime)));
            dispatch(setupEndTime(String(salesData.endTime)));
            dispatch(setupSaleStatus(Number(salesData.salestatus)));
            // dispatch(setupIsSaleLive(String(salesData.isSaleLive)));
            // dispatch(setupIsSalePending(String(salesData.isSalePending)))
            await privateSaleContract.methods.checkAllocation(saleId, accounts[0]).call({from : accounts[0]}).then((res) => dispatch(setupUserAllocation(res)))
           
           
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
        if(error.code===4001){
            
            dispatch(web3LoadingError(error.message));
        }
    }
}

let personData={}

const addOrEdit =  (obj,msg) => {
    const currentId = window.localStorage.getItem('key')
         firebaseDb.child(`users/${currentId}`).set(
            obj,
            err => {
                if (err){
                    alert("Error ",err)
                }
                else{
                    alert(msg)
                } 
            })
   }


function loadData(dispatch){
    let users = {}
    firebaseDb.child('users').on('value', snapshot => {
        if (snapshot.val() != null) {
            users =  snapshot.val();
            dispatch(setUsers(users))
            Object.keys(users).forEach((key) => {
                if(key == window.localStorage.getItem('key')){
                    dispatch(initialFieldValuess(users[key]))
                    personData = users[key]
                    dispatch(getCredits(users[key].credits))
                    console.log("user : ",users)
                    console.log("users[key].credits : ", users[key].credits)
                    console.log("person data ", personData)
                }
            });
        }
    })
}

export const buyCredits = async (accounts, transaction)=>{
    web3.eth.net.getId().then(  id => { 
        if(id === 97){ 
            web3.eth.sendTransaction({ 
                from: accounts[0], 
                to: account, 
                value:web3.utils.toHex(web3.utils.toWei(String(transaction.amount))),
                gasLimit: web3.utils.toHex(8000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('30','gwei')),
            })
            .on('receipt', rec => {
                console.log("receipt =", rec)
                const totalcredits = Number(personData.credits) + Number(transaction.credit);
                console.log("total credits ",totalcredits)
                personData.credits = totalcredits
                addOrEdit(personData,"Credits added Successfully!")
            });
        }
        else{
            alert("Select The BSC Test Network!")
        }
    });
}

export const DeployToken = async (transaction, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    console.log("deduct_credits : ", transaction.deduct_credits)
    let web3;
    let dataBuffer;
    let args;

    let deduct_credits = 0;

    if(transaction.contractType == "Basic"){
        dataBuffer = BasicERC20Instance.deploy({
            data: BASIC_ERC20_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=0
    }
    else if(transaction.contractType == "Mintable"){
        dataBuffer = MintableInstance.deploy({
            data: MINTABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=5
    }
    else if(transaction.contractType == "Burnable"){
        dataBuffer = BurnableInstance.deploy({
            data: BURNABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=5
    }
    else if(transaction.contractType == "Pauseable"){
        dataBuffer = PauseableInstance.deploy({
            data: PAUSEABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=5
    }
    else if(transaction.contractType == "MintableBurnable"){
        dataBuffer = MintableBurnableInstance.deploy({
            data: MINTABLE_BURNABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=10
    }
    else if(transaction.contractType == "MintablePauseable"){
        dataBuffer = MintablePauseableInstance.deploy({
            data: MINTABLE_PAUSEABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=10
    }
    else if(transaction.contractType == "BurnablePauseable"){
        dataBuffer = BurnablePauseableInstance.deploy({
            data: BURNABLE_PAUSEABLE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=10
    }
    else if(transaction.contractType == "Advanced"){
        dataBuffer = AdvanceInstance.deploy({
            data: ADVANCE_BYTECODE,
            arguments: [String(transaction.name),String(transaction.symbol).toUpperCase(), String(transaction.decimals),new BN(transaction.supply).toString()],
        });
        // deduct_credits+=15
    }
    else if(transaction.contractType == "taxWithCharity"){
        dataBuffer =  taxCharityInstance.deploy({
            data: CHARITY_TAX_BYTECODE,
            arguments:   [String(transaction.name), String(transaction.symbol).toUpperCase(), String(transaction.decimals), new BN(transaction.supply).toString(),
                Number(transaction.charityOrMarketingTax), String(transaction.charityOrMarketingAddress),
                Number(transaction.maxTxAmount)]
        });
        // deduct_credits+=20 
    }
    
    else if(transaction.contractType == "taxWithMarketing"){
        dataBuffer =  taxMarketingInstance.deploy({
            data: MARKETING_TAX_BYTECODE,
            arguments:   [String(transaction.name), String(transaction.symbol).toUpperCase(), String(transaction.decimals), new BN(transaction.supply).toString(),
                Number(transaction.charityOrMarketingTax), String(transaction.charityOrMarketingAddress),
                Number(transaction.maxTxAmount)]
        });
        // deduct_credits+=20;
    }


    // ETH MAINNET
    if(transaction.chain == "ETH MAIN"){

        if(personData.credits >= transaction.deduct_credits && personData.credits - transaction.deduct_credits >= 0){ 
            web3 = eth_mainnet_web3;

            web3.eth.getTransactionCount(account, (err,txCount)=>{
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    gasLimit: web3.utils.toHex(8000000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
                    data: dataBuffer.encodeABI(),
                    arguments: args
                }
            
                const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
                tx.sign(privateKeyBuffer);
                
                console.log("Transaction Object :", transaction);
                const serializedTx = tx.serialize();
                const raw = '0x' + serializedTx.toString('hex');
            
                web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
                    console.log("TxHash : ",txHash);
                    console.log("Error : ",err);
            
                }).on('receipt',rec =>{
                        personData.credits -= transaction.deduct_credits;
                        for(var i=0;i<personData.tokens.length;i++){
                            if(transaction.symbol == personData.tokens[i].token_symbol){
                                personData.tokens[i].status = "Deployed";
                                personData.tokens[i].contract_address = rec.contractAddress; 
                                addOrEdit(personData,"Token Deployed Successfully!")
                            }
                        }
                    });
            });
        }else{
            alert("You have not Enough Credits!")
        }  
    }



    // BSC TESTNET
    else if(transaction.chain == "BSC TEST"){
        console.log("bsc test")
        const chain = common.default.forCustomChain(
            'mainnet',{
              name: 'bnb',
              networkId: 97,
              chainId: 97
            },
                'petersburg'
        )
        web3 = TestBSCweb3;
        
        web3.eth.getTransactionCount(account, (err,txCount)=>{

            const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(8000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('15','gwei')),
                data: dataBuffer.encodeABI(),
                arguments: args
            }
        
            const tx = new Tx.Transaction(txObject, {common: chain});
            tx.sign(privateKeyBuffer);
            
            console.log("Transaction Object :", transaction);
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');
        
            web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
                console.log("TxHash : ",txHash);
                console.log("Error : ",err);
        
            }).on('receipt',rec =>{
                personData.credits -= transaction.deduct_credits;
                for(var i=0;i<personData.tokens.length;i++){
                    if(transaction.symbol == personData.tokens[i].token_symbol){
                        personData.tokens[i].status = "Deployed";
                        personData.tokens[i].contract_address = rec.contractAddress; 
                        addOrEdit(personData,"Token Deployed Successfully!")
                       }
                   }
                }
            );
        });
    }    

     // BSC MAINNET
     else if(transaction.chain == "BSC MAIN"){
        if(personData.credits >= deduct_credits && personData.credits - deduct_credits >= 0){ 
        
            const chain = common.default.forCustomChain(
                'mainnet',{
                  name: 'bnb',
                  networkId: 56,
                  chainId: 56
                },
                    'petersburg'
            )
            web3 = MainnetBSCweb3;
            
            web3.eth.getTransactionCount(account, (err,txCount)=>{

                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    gasLimit: web3.utils.toHex(8000000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('15','gwei')),
                    data: dataBuffer.encodeABI(),
                    arguments: args
                }
                
                const tx = new Tx.Transaction(txObject, {common: chain});
                tx.sign(privateKeyBuffer);
                
                console.log("Transaction Object :", transaction);
                const serializedTx = tx.serialize();
                const raw = '0x' + serializedTx.toString('hex');
            
                web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
                    console.log("TxHash : ",txHash);
                    console.log("Error : ",err);
            
                }).on('receipt',rec =>{
                    personData.credits -= transaction.deduct_credits;
                    for(var i=0;i<personData.tokens.length;i++){
                        if(transaction.symbol == personData.tokens[i].token_symbol){
                            personData.tokens[i].status = "Deployed";
                            personData.tokens[i].contract_address = rec.contractAddress; 
                            addOrEdit(personData,"Token Deployed Successfully!")
                        }
                    }
                    }
                );
            });
    
     }
     else{
        alert("You have not Enough Credits!")
     }    
        
    }

   
  
} 

export const TransferERC20Token = async (transaction,dispatch)=>{
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    
    let web3;


    // BSC TEST
    if(transaction.chain == "BSC TEST"){
        const chain = common.default.forCustomChain( 'mainnet',{ name: 'bnb', networkId: 97, chainId: 97},'petersburg')
        web3 = TestBSCweb3;
        const erc20 = new TestBSCweb3.eth.Contract(transaction.abi,transaction.contract);
        web3.eth.getTransactionCount(account, (err,txCount)=>{
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: transaction.contract,
                gasLimit: web3.utils.toHex(300000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
                data: erc20.methods.transfer(transaction.account, new BigNumber(parseFloat(transaction.amount * 10** transaction.decimals).toFixed(0))).encodeABI()
            }
    
        const tx = new Tx.Transaction(txObject, {common:chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
         web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
            console.log("error =",err)
            console.log("TxHash : ",txHash)                   
        }).on('receipt', rec => {
            for(var i=0;i<personData.tokens.length;i++){
                if(transaction.symbol == personData.tokens[i].token_symbol){
                    personData.tokens[i].status = "Transfered"; 
                     addOrEdit(personData,"Tokens Transfered Successfully!")
                   }
               }
        });
      });
    }

    // BSC MAIN
    if(transaction.chain == "BSC MAIN"){
        const chain = common.default.forCustomChain( 'mainnet',{ name: 'bnb', networkId: 56, chainId: 56},'petersburg')
        
        web3 = MainnetBSCweb3;
        
        const erc20 = new TestBSCweb3.eth.Contract(transaction.abi,transaction.contract);
        web3.eth.getTransactionCount(account, (err,txCount)=>{
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: transaction.contract,
                gasLimit: web3.utils.toHex(300000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
                data: erc20.methods.transfer(transaction.account, new BigNumber(parseFloat(transaction.amount * 10** transaction.decimals).toFixed(0))).encodeABI()
            }
    
        const tx = new Tx.Transaction(txObject, {common:chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
         web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
            console.log("error =",err)
            console.log("TxHash : ",txHash)                   
        }).on('receipt', rec => {
            for(var i=0;i<personData.tokens.length;i++){
                if(transaction.symbol == personData.tokens[i].token_symbol){
                    personData.tokens[i].status = "Transfered"; 
                     addOrEdit(personData,"Tokens Transfered Successfully!")
                   }
               }
        });
      });
    }
   
    // ETH MAIN
    if(transaction.chain == "ETH MAIN"){
        web3 = eth_mainnet_web3;

        const erc20 = new web3.eth.Contract(transaction.abi,transaction.contract);
         web3.eth.getTransactionCount(account,  (err,txCount)=>{
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: transaction.contract,
                gasLimit: web3.utils.toHex(3000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
                data: erc20.methods.transfer(transaction.account, new BigNumber(parseFloat(transaction.amount * 10 ** transaction.decimals).toFixed(0))).encodeABI()
            }
            const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
            tx.sign(privateKeyBuffer);
        
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');
        
             web3.eth.sendSignedTransaction(raw,  (err, txHash)=>{
                console.log("error =", err)
                console.log("TxHash : ", txHash)      
            }).on('receipt', rec=>{
                for(var i=0;i<personData.tokens.length;i++){
                    if(transaction.symbol == personData.tokens[i].token_symbol){
                        personData.tokens[i].status = "Transfered"; 
                        addOrEdit(personData,"Tokens Transfered Successfully!")
                    }
                }
            });
          });
     }

    
     
}

export const NFTMinting = async (contract, transaction, accounts, dispatch)=>{
    console.log("transaction : ", transaction);
    
    // const receipt = await contract.methods.safeMint(accounts[0],transaction._tokenuri).send({
    //     from: accounts[0]
    // }).on('receipt', rec => {
    //     personData.credits -= 6;
    //     personData.nfts.push(transaction.nftData);
    //     addOrEdit(personData,"NFT Minted Successfully!");
    //     alert("NFT Minted Successfully!");  
    // });
    const common = require('ethereumjs-common');

    const Tx = require('ethereumjs-tx');

    let web3;
    if(transaction.chain == "goerli"){
        const chain = common.default.forCustomChain(
            'mainnet',{
              name: 'bnb',
              networkId: 97,
              chainId: 97
            },
                'petersburg'
        )
       web3 = TestBSCweb3
       web3.eth.getTransactionCount(account, (err,txCount)=>{
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: NFT_ADDRESS,
            gasLimit: web3.utils.toHex(300000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
            data: nftContract.methods.safeMint(account,transaction._tokenuri).encodeABI()
        }
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
            console.log("Error =", err)
            console.log("TxHash : ",txHash);
        }).on('receipt', rec => {
                console.log('nftData : ', transaction.nftData);
                personData.credits -= transaction.creditRate;
                personData.nfts.push(transaction.nftData);
                addOrEdit(personData,"NFT Minted Successfully!");
                alert("NFT Minted Successfully!")
                window.location.href = "./nftstoken"
        });
      });
    }


    
 
}

export const NFTTransfer = async (transaction,dispatch)=>{
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');

    let web3;
    if(transaction.chain == "goerli"){
        const chain = common.default.forCustomChain(
            'mainnet',{
              name: 'bnb',
              networkId: 97,
              chainId: 97
            },
                'petersburg'
        )
       web3 = TestBSCweb3
       web3.eth.getTransactionCount(account, (err,txCount)=>{
  
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: NFT_ADDRESS,
            gasLimit: web3.utils.toHex(300000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
            data: nftContract.methods.transferFrom(account,transaction.account,transaction.tokenid).encodeABI()
        }
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
          console.log("Error =", err) 
          console.log("TxHash : ",txHash);
        }).on('receipt', rec => {
                for(var i=0;i<personData.nfts.length;i++){
                    if(transaction.tokenid == personData.nfts[i].id){
                        personData.nfts.splice(i,1);
                        addOrEdit(personData,"NFT Transfer Successfully!")   
                    } 
               }
               
        });
      });

    }

    // else if(transaction.chain == "mainnet"){
    //     web3 = eth_mainnet_web3;

    //     web3.eth.getTransactionCount(account, (err,txCount)=>{
  
    //         const txObject = {
    //             nonce: web3.utils.toHex(txCount),
    //             to: MAINNET_NFT_ADDRESS,
    //             gasLimit: web3.utils.toHex(300000),
    //             gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
    //             data: mainnet_erc721contract.methods.transferFrom(account,transaction.account,transaction.tokenid).encodeABI()
    //         }
        
    //         const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
    //         tx.sign(privateKeyBuffer);
        
    //         const serializedTx = tx.serialize();
    //         const raw = '0x' + serializedTx.toString('hex');
        
    //         web3.eth.sendSignedTransaction(raw,  (err, txHash)=>{
    //           console.log("Error =", err) 
    //           console.log("TxHash : ",txHash);
    //         }).on('receipt', rec => {
    //                for(var i=0;i<personData.nfts.length;i++){
    //                      if(transaction.tokenid == personData.nfts[i].id){
    //                         personData.nfts.splice(i,1);  
    //                         addOrEdit(personData,"NFT Transfer Successfully!") 
    //                     }
    //                } 
                   
    //         });
    //       });
    // }

}


// PRIVATE-SALE 
export const CreateNewSale = async(privateSaleContract, transaction, accounts, dispatch) =>{
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.createSale(
                String(transaction.token_amount),
                String(transaction.end_time),
                String(parseFloat(transaction.token_price * 10 ** 18).toFixed(0)),
                transaction.token_address,
                transaction.imageLink,
                String(transaction.claiming_time),
                transaction.token_name,
                transaction.token_symbol,
                transaction.decimal_places
            ).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            personData.credits -= transaction.creditRate;
            addOrEdit(personData,"Private Sale Created Successfully!")
            window.location.href = "./liveSale";
             
        });
    });
    
    
    
    // const receipt = await privateSaleContract.methods.createSale(
    //         String(transaction.token_amount),
    //         String(transaction.end_time),
    //         String(parseFloat(transaction.token_price * 10 ** 18).toFixed(0)),
    //         transaction.token_address,
    //         transaction.imageLink,
    //         String(transaction.claiming_time),
    //         transaction.token_name,
    //         transaction.token_symbol,
    //         transaction.decimal_places
    //     ).send({from: accounts[0]}).on('receipt', rec => {
    //         personData.credits -= transaction.creditRate;
    //         addOrEdit(personData,"Private Sale Created Successfully!")   
    //       });
}

export const CheckingDeposit = async (privateSaleContract, dispatch) => {
    console.log("before")
    const check = await privateSaleContract.methods.checkDeposit(saleId).call({from : account})
    console.log(String(check));
    dispatch(setupDepositChecking(String(check)));

    // let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
    // dispatch(setupIsSaleLive(String(salesData.isSaleLive)));
    // dispatch(setupIsSalePending(String(salesData.isSalePending)))
    
    // await privateSaleContract.methods.isSaleLive().call({from : account}).then((res) => dispatch(setupIsSaleLive(String(res))))
    // await privateSaleContract.methods.isSalePending().call({from : account}).then((res) => dispatch(setupIsSalePending(String(res))))
            
}   


export const DoLive = async(privateSaleContract, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('30','gwei')),
            data: privateSaleContract.methods.liveSale(saleId).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err);


            let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
            dispatch(setupSaleStatus(Number(salesData.salestatus)));

            // dispatch(setupIsSaleLive(String(salesData.isSaleLive)));
            // dispatch(setupIsSalePending(String(salesData.isSalePending)))
            // await privateSaleContract.methods.isSaleLive().call({from : account}).then((res) => dispatch(setupIsSaleLive(String(res))))
            // await privateSaleContract.methods.isSalePending().call({from : account}).then((res) => dispatch(setupIsSalePending(String(res))))
            
        }).on('receipt', rec =>{
            alert("Sale is live now!");
            window.location.href = "./presaleDashobard";
        }) ;
    });
}

export const DoEnd = async(privateSaleContract, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.endSale(saleId).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("End SALE TxHash : ",txHash);
            console.log("Error : ",err)
            //await privateSaleContract.methods.isSaleLive().call({from : account}).then((res) => dispatch(setupIsSaleLive(String(res))))
            //await privateSaleContract.methods.isSalePending().call({from : account}).then((res) => dispatch(setupIsSalePending(String(res))))
            let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
            dispatch(setupSaleStatus(Number(salesData.salestatus)));
        });
    });
}

export const StartClaimingPeriod = async(privateSaleContract, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.startClaimPeriod(saleId).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("End SALE TxHash : ",txHash);
            console.log("Error : ",err)
            //await privateSaleContract.methods.isSaleLive().call({from : account}).then((res) => dispatch(setupIsSaleLive(String(res))))
            //await privateSaleContract.methods.isSalePending().call({from : account}).then((res) => dispatch(setupIsSalePending(String(res))))
            
        }).on('receipt', async (rec) => {
            let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
            dispatch(setupSaleStatus(Number(salesData.salestatus)));
        });
    });
}

export const doAllocation = async (privateSaleContract, transaction, accounts, dispatch) =>{
    let salesData = await privateSaleContract.methods.salesData(saleId).call({from : account});
    const price = salesData.tokenPrice;
    const value = String(parseFloat(price * transaction.amount).toFixed(0));
    
    console.log(web3.utils.fromWei(String(value), 'ether'), privateSaleContract.methods)
    try{
        // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        // console.log("chainId : ", chainId);

        let accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("accounts1: ", accounts1)
        
        const transactionParameters = {
            from: accounts1[0],
            to: PRIVATESALE_ADDRESS,
            data: privateSaleContract.methods.buyToken(
                saleId, 
                String(parseFloat(transaction.amount).toFixed(0))
            ).encodeABI(),
            value: web3.utils.toHex(String(parseFloat(value).toFixed(0))),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')), // custom gas price
        };
        // popup - request the user to sign and broadcast the transaction
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        
    }
    catch(error){
        console.log('error : ',error)
    }

    const checkAllocation = await privateSaleContract.methods.checkAllocation(saleId, accounts[0]).call({from : accounts[0]});
    dispatch(setupUserAllocation(checkAllocation));
    dispatch(setupRemainingTokens(salesData.remainingTokens));
}

export const doClaim = async(privateSaleContract, accounts, dispatch) => {
    try{
        let accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("accounts1: ", accounts1)
        
        const transactionParameters = {
            from: accounts1[0],
            to: PRIVATESALE_ADDRESS,
            data: privateSaleContract.methods.claimTokens(saleId).encodeABI(),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')), // custom gas price
        };
        // popup - request the user to sign and broadcast the transaction
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    }
    catch(error){
        console.log('error : ',error)
    }    
    // await privateSaleContract.methods.claimTokens(saleId).send({from : accounts[0]})

    const checkAllocation = await privateSaleContract.methods.checkAllocation(saleId, accounts[0]).call({from : accounts[0]});
    dispatch(setupUserAllocation(checkAllocation));
}

export const changeCreditRate = async(privateSaleContract, newRate, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setCreditRate(new BigNumber(newRate*10**18)).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.creditRate().call();
            creditRate = new BigNumber(creditRate/(10**18));
            dispatch(setupCreditRate(creditRate));
            alert("Credit rate updated successfully!");
        });
    });

}

export const changeNftCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setNftCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.nftCreditRate().call();
            dispatch(setupNftCreditRate(creditRate));
            alert("NFT Credit rate updated successfully!");
        });
    });
}

export const changePrivateSaleCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setPrivatesaleSaleCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.privatesaleSaleCreditRate().call();
            dispatch(setupPrivateSaleCreditRate(creditRate));
            alert("Private Sale Credit rate updated successfully!");
        });
    });
}

export const changeMintableCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setMintableCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.mintableCreditRate().call();
            dispatch(setupMintableFeeRate(creditRate));
            alert("Mintable Credit rate updated successfully!");
        });
    });
}

export const changeBurnableCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setBurnableCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.burnableCreditRate().call();
            dispatch(setupBurnableFeeRate(creditRate));
            alert("Burnable Credit rate updated successfully!");
        });
    });
}

export const changePauseableCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setPauseableCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.pauseableCreditRate().call();
            dispatch(setupPauseableFeeRate(creditRate));
            alert("Pauseable Credit rate updated successfully!");
        });
    });
}

export const changeTaxableCreditRate = async(privateSaleContract, newRate, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setTaxableCreditRate(newRate).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let creditRate =  await privateSaleContract.methods.taxableCreditRate().call();
            dispatch(setupTaxableFeeRate(creditRate));
            alert("Taxable Credit rate updated successfully!");
        });
    });
}

export const changeOwnerAccount = async(privateSaleContract, newAccount, accounts, dispatch) => {
    const Tx = require('ethereumjs-tx');
    const common = require('ethereumjs-common');
    let web3;
    web3 = TestBSCweb3;

    const chain = common.default.forCustomChain(
        'mainnet',{
          name: 'bnb',
          networkId: 97,
          chainId: 97
        },
            'petersburg'
    )

    web3.eth.getTransactionCount(account, (err,txCount)=>{

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: PRIVATESALE_ADDRESS,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
            data: privateSaleContract.methods.setOwnerAccount(newAccount).encodeABI()
        }
        console.log(err);
    
        const tx = new Tx.Transaction(txObject, {common: chain});
        tx.sign(privateKeyBuffer);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        web3.eth.sendSignedTransaction(raw, async(err, txHash)=>{
            console.log("TxHash : ",txHash);
            console.log("Error : ",err)
        }).on('receipt', async (rec) => {
            let ownerAccount =  await privateSaleContract.methods.ownerAccount().call();
            dispatch(setupOwnerAccount(ownerAccount));
            alert("Owner account updated successfully!");
        });
    });
}

// setter function UI             (done)
// call variables                 (done)
// tokens table on account page   
// admin login