import React, { useEffect,createContext, useReducer, useContext } from 'react';
import AppReducer from '../store/AppReducer';

import { loadBlockchain } from '../store/asyncActions';
// Initial state
const initialState = {
  web3: null,
  accounts: [],
  web3LoadingErrorMessage:"",
  web3Loadded: false,
  contract: null,
  rinkeby_nft_contract: "",
  ropsten_nft_contract: "",
  initialFieldValues : {},
  userss: {},
  user_credits:0,
  goerli_nft_supply:0,
  // ropsten_nft_supply:0,
  // PRIVATE SALE PROPERTIES
  privateSaleContract: "",
  token_name: "",
  token_symbol: "",
  token_decimals: 0,
  amount_of_tokens: 0,
  remaining_tokens: 0,
  token_address: "",
  token_price: 0,
  claim_time: "",
  end_time: "",
  token_image : "",
  
  // isSaleLive : "",
  // isSalePending : "",
  saleStatus : 0,
  
  depositChecking: "",
  userAllocation: 0,
  
  creditRate: 0,
  nftCreditRate: 0,
  privateSaleCreditRate: 0,
  mintableFeeRate: 0,
  burnableFeeRate: 0,
  pauseableFeeRate: 0,
  taxableFeeRate: 0,
  ownerAccount: '',
  totalSales: 0,
  // balanceInEth : 0
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(()=> {
        console.log("Hello world!!");
        loadBlockchain(dispatch);
    },[])    
    

    return (<GlobalContext.Provider value={[state,dispatch]}>
                {children}
            </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);