

export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const setupContract = (contract) => {
    return {
        type: 'SETUP_CONTRACT',
        payload: contract
    };
}

export const setupContract1 = (contract) => {
    return {
        type: 'SETUP_CONTRACT1',
        payload: contract
    };
}

export const setupContract2 = (contract) => {
    return {
        type: 'SETUP_CONTRACT2',
        payload: contract
    };
}

export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}

export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        errorMessage: errorMessage
    };
}


export const setUsers = (web3) => {
    return {
        type: 'SETUSERS',
        payload: web3
    };
}

export const initialFieldValuess = (web3) => {
    return {
        type: 'SETINITIALVALUES',
        payload: web3
    };
}


export const getCredits = (web3) => {
    return {
        type: 'GETCREDITS',
        payload: web3
    };
}

export const nftSupply = (web3) => {
    return {
        type: 'NFTSUPPLY',
        payload: web3
    };
}

export const nftSupply2 = (web3) => {
    return {
        type: 'NFTSUPPLY2',
        payload: web3
    };
}

export const tokenContractAddress = (web3) => {
    return {
        type: 'TOKENCONTRACTADDRESS',
        payload: web3
    };
}


export const setupPrivateSaleContract = (contract) => {
    return {
        type: 'SETUPPRIVATESALECONTRACT',
        payload: contract
    };
}

export const setupTokenName = (name) => {
    return {
        type: 'SETUPTOKENNAME',
        payload: name
    };
}

export const setupTokenSymbol = (symbol) => {
    return {
        type: 'SETUPTOKENSYMBOL',
        payload: symbol
    };
}

export const setupTokenDecimals = (dec) => {
    return {
        type: 'SETUPTOKENDECIMALS',
        payload: dec
    };
}

export const setupTokenAmount = (amount) => {
    return {
        type: 'SETUPTOKENAMOUNT',
        payload: amount
    };
}

export const setupTokenAddress = (address) => {
    return {
        type: 'SETUPTOKENADDRESS',
        payload: address
    };
}

export const setupRemainingTokens = (amount) => {
    return {
        type: 'SETUPREMAININGTOKENS',
        payload: amount
    };
}

export const setupTokenPrice = (price) => {
    return {
        type: 'SETUPTOKENPRICE',
        payload: price
    };
}

export const setupClaimTime = (time) => {
    return {
        type: 'SETUPCLAIMTIME',
        payload: time
    };
}

export const setupEndTime = (time) => {
    return {
        type: 'SETUPENDTIME',
        payload: time
    };
}

export const setupTokenImage = (link) => {
    return {
        type: 'SETUPTOKENIMAGE',
        payload: link
    };
}

// export const setupIsSaleLive = (sale) => {
//     return {
//         type: 'SETUPISSALELIVE',
//         payload: sale
//     };
// }

// export const setupIsSalePending = (sale) => {
//     return {
//         type: 'SETUPISSALEPENDING',
//         payload: sale
//     };
// }

export const setupSaleStatus = (sale) => {
    return {
        type: 'SETUPSALESTATUS',
        payload: sale
    };
}

export const setupDepositChecking = (check) => {
    return {
        type: 'SETUPDEPOSITCHECKING',
        payload: check
    };
}

export const setupUserAllocation = (allocation) => {
    return {
        type: 'SETUPUSERALLOCATION',
        payload: allocation
    };
}

export const setupCreditRate = (newRate) => {
    return {
        type: 'SETUPCREDITRATE',
        payload: newRate
    };
}

export const setupNftCreditRate = (newRate) => {
    return {
        type: 'SETUPNFTCREDITRATE',
        payload: newRate
    };
}

export const setupPrivateSaleCreditRate = (newRate) => {
    return {
        type: 'SETUPPRIVATESALECREDITRATE',
        payload: newRate
    };
}

export const setupMintableFeeRate = (newRate) => {
    return {
        type: 'SETUPMINTABLEFEERATE',
        payload: newRate
    };
}

export const setupBurnableFeeRate = (newRate) => {
    return {
        type: 'SETUPBURNABLEFEERATE',
        payload: newRate
    };
}

export const setupPauseableFeeRate = (newRate) => {
    return {
        type: 'SETUPPAUSEABLEFEERATE',
        payload: newRate
    };
}

export const setupTaxableFeeRate = (newRate) => {
    return {
        type: 'SETUPTAXABLEFEERATE',
        payload: newRate
    };
}

export const setupOwnerAccount = (acc) => {
    return {
        type: 'SETUPOWNERACCOUNT',
        payload: acc
    };
}

export const setupPrivateSaleTotalSales = (sales) => {
    return {
        type: 'SETUPPRIVATESALETOTALSALES',
        payload: sales
    };
}

// export const setupBalanceInEth = (balance) => {
//     return {
//         type: 'SETUPBALANCEINETH',
//         payload: balance
//     };
// }