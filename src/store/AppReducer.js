export default (state, action) => {
  switch(action.type) {
        
    case 'SETUP_WEB3':
      return {
        ...state,
        web3: action.payload,
        web3LoadingErrorMessage: "",
        web3Loadded: true
      }
    case 'SETUP_CONTRACT':
      return {
        ...state,
        contract: action.payload
      }

      case 'SETUP_CONTRACT1':
      return {
        ...state,
        rinkeby_nft_contract: action.payload
      }

      case 'SETUP_CONTRACT2':
      return {
        ...state,
        ropsten_nft_contract: action.payload
      }

    case 'ADD_ETHEREUM_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload
      }
    case 'WEB3_LOADING_ERROR':
      return {
        ...state,
        web3LoadingErrorMessage: action.errorMessage,
        web3Loadded: false
      }
      
      case 'SETUSERS':
        return {
          ...state,
           userss: action.payload    
         }

         case 'SETINITIALVALUES':
          return {
            ...state,
            initialFieldValues: action.payload    
           }

         
      case 'GETCREDITS':
      return {
        ...state,
         user_credits: action.payload
      }

      
      case 'NFTSUPPLY':
      return {
        ...state,
        goerli_nft_supply: action.payload
      }

      case 'NFTSUPPLY2':
      return {
        ...state,
         ropsten_nft_supply: action.payload
      }

      
      case 'TOKENCONTRACTADDRESS':
      return {
        ...state,
        token_contract_address: action.payload
      }
           
      case 'SETUPPRIVATESALECONTRACT':
        return {
          ...state,
          privateSaleContract: action.payload
      }

      case 'SETUPTOKENNAME':
        return {
          ...state,
          token_name: action.payload
      }

      case 'SETUPTOKENSYMBOL':
        return {
          ...state,
          token_symbol: action.payload
      }

      case 'SETUPTOKENDECIMALS':
        return {
          ...state,
          token_decimals: action.payload
      }

      case 'SETUPTOKENAMOUNT':
        return {
          ...state,
          amount_of_tokens: action.payload
      }

      case 'SETUPTOKENADDRESS':
        return {
          ...state,
          token_address: action.payload
      }

      case 'SETUPCLAIMTIME':
        return {
          ...state,
          claim_time: action.payload
      }

      case 'SETUPENDTIME':
        return {
          ...state,
          end_time: action.payload
      }

      case 'SETUPTOKENIMAGE':
        return {
          ...state,
          token_image: action.payload
      }

      // case 'SETUPISSALELIVE':
      //   return {
      //     ...state,
      //     isSaleLive: action.payload
      // }

      // case 'SETUPISSALEPENDING':
      //   return {
      //     ...state,
      //     isSalePending: action.payload
      // }

      case 'SETUPSALESTATUS':
        return {
          ...state,
          saleStatus: action.payload
      }


      case 'SETUPDEPOSITCHECKING':
        return {
          ...state,
          depositChecking: action.payload
      }

      case 'SETUPREMAININGTOKENS':
        return {
          ...state,
          remaining_tokens: action.payload
      }

      case 'SETUPTOKENPRICE':
        return {
          ...state,
          token_price: action.payload
      }

      case 'SETUPUSERALLOCATION':
        return {
          ...state,
          userAllocation: action.payload
      }

      case 'SETUPCREDITRATE':
        return {
          ...state,
          creditRate: action.payload
      }

      case 'SETUPNFTCREDITRATE':
        return {
          ...state,
          nftCreditRate: action.payload
      }

      case 'SETUPPRIVATESALECREDITRATE':
        return {
          ...state,
          privateSaleCreditRate: action.payload
      }

      case 'SETUPMINTABLEFEERATE':
        return {
          ...state,
          mintableFeeRate: action.payload
      }

      case 'SETUPBURNABLEFEERATE':
        return {
          ...state,
          burnableFeeRate: action.payload
      }

      case 'SETUPPAUSEABLEFEERATE':
        return {
          ...state,
          pauseableFeeRate: action.payload
      }

      case 'SETUPTAXABLEFEERATE':
        return {
          ...state,
          taxableFeeRate: action.payload
      }

      case 'SETUPOWNERACCOUNT':
        return {
          ...state,
          ownerAccount: action.payload
      }

      case 'SETUPPRIVATESALETOTALSALES':
        return {
          ...state,
          totalSales: action.payload
      }

      // case 'SETUPBALANCEINETH':
      //   return {
      //     ...state,
      //     balanceInEth: action.payload
      // }

    default:
      return state;
  }
}