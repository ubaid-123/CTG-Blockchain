export const BURNABLE_PAUSEABLE_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_decimal",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]



export const BURNABLE_PAUSEABLE_BYTECODE = "0x60806040523480156200001157600080fd5b50604051620029d0380380620029d0833981810160405281019062000037919062000605565b838381600390816200004a9190620008f6565b5080600490816200005c9190620008f6565b5050506000600560006101000a81548160ff0219169083151502179055506200009a6200008e6200010460201b60201c565b6200010c60201b60201c565b81600560156101000a81548160ff021916908360ff16021790555080600681905550620000fa33620000d1620001d260201b60201c565b600a620000df919062000b60565b600654620000ee919062000bb1565b620001e960201b60201c565b5050505062000d5a565b600033905090565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600560159054906101000a900460ff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200025b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002529062000c5d565b60405180910390fd5b6200026f600083836200035660201b60201c565b806002600082825462000283919062000c7f565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000336919062000ccb565b60405180910390a362000352600083836200038360201b60201c565b5050565b620003666200038860201b60201c565b6200037e838383620003dd60201b620008031760201c565b505050565b505050565b62000398620003e260201b60201c565b15620003db576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003d29062000d38565b60405180910390fd5b565b505050565b6000600560009054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620004628262000417565b810181811067ffffffffffffffff8211171562000484576200048362000428565b5b80604052505050565b600062000499620003f9565b9050620004a7828262000457565b919050565b600067ffffffffffffffff821115620004ca57620004c962000428565b5b620004d58262000417565b9050602081019050919050565b60005b8381101562000502578082015181840152602081019050620004e5565b60008484015250505050565b6000620005256200051f84620004ac565b6200048d565b90508281526020810184848401111562000544576200054362000412565b5b62000551848285620004e2565b509392505050565b600082601f8301126200057157620005706200040d565b5b8151620005838482602086016200050e565b91505092915050565b600060ff82169050919050565b620005a4816200058c565b8114620005b057600080fd5b50565b600081519050620005c48162000599565b92915050565b6000819050919050565b620005df81620005ca565b8114620005eb57600080fd5b50565b600081519050620005ff81620005d4565b92915050565b6000806000806080858703121562000622576200062162000403565b5b600085015167ffffffffffffffff81111562000643576200064262000408565b5b620006518782880162000559565b945050602085015167ffffffffffffffff81111562000675576200067462000408565b5b620006838782880162000559565b93505060406200069687828801620005b3565b9250506060620006a987828801620005ee565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200070857607f821691505b6020821081036200071e576200071d620006c0565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620007887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000749565b62000794868362000749565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620007d7620007d1620007cb84620005ca565b620007ac565b620005ca565b9050919050565b6000819050919050565b620007f383620007b6565b6200080b6200080282620007de565b84845462000756565b825550505050565b600090565b6200082262000813565b6200082f818484620007e8565b505050565b5b8181101562000857576200084b60008262000818565b60018101905062000835565b5050565b601f821115620008a657620008708162000724565b6200087b8462000739565b810160208510156200088b578190505b620008a36200089a8562000739565b83018262000834565b50505b505050565b600082821c905092915050565b6000620008cb60001984600802620008ab565b1980831691505092915050565b6000620008e68383620008b8565b9150826002028217905092915050565b6200090182620006b5565b67ffffffffffffffff8111156200091d576200091c62000428565b5b620009298254620006ef565b620009368282856200085b565b600060209050601f8311600181146200096e576000841562000959578287015190505b620009658582620008d8565b865550620009d5565b601f1984166200097e8662000724565b60005b82811015620009a85784890151825560018201915060208501945060208101905062000981565b86831015620009c85784890151620009c4601f891682620008b8565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111562000a6b5780860481111562000a435762000a42620009dd565b5b600185161562000a535780820291505b808102905062000a638562000a0c565b945062000a23565b94509492505050565b60008262000a86576001905062000b59565b8162000a96576000905062000b59565b816001811462000aaf576002811462000aba5762000af0565b600191505062000b59565b60ff84111562000acf5762000ace620009dd565b5b8360020a91508482111562000ae95762000ae8620009dd565b5b5062000b59565b5060208310610133831016604e8410600b841016171562000b2a5782820a90508381111562000b245762000b23620009dd565b5b62000b59565b62000b39848484600162000a19565b9250905081840481111562000b535762000b52620009dd565b5b81810290505b9392505050565b600062000b6d82620005ca565b915062000b7a836200058c565b925062000ba97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000a74565b905092915050565b600062000bbe82620005ca565b915062000bcb83620005ca565b925082820262000bdb81620005ca565b9150828204841483151762000bf55762000bf4620009dd565b5b5092915050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062000c45601f8362000bfc565b915062000c528262000c0d565b602082019050919050565b6000602082019050818103600083015262000c788162000c36565b9050919050565b600062000c8c82620005ca565b915062000c9983620005ca565b925082820190508082111562000cb45762000cb3620009dd565b5b92915050565b62000cc581620005ca565b82525050565b600060208201905062000ce2600083018462000cba565b92915050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b600062000d2060108362000bfc565b915062000d2d8262000ce8565b602082019050919050565b6000602082019050818103600083015262000d538162000d11565b9050919050565b611c668062000d6a6000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806370a08231116100ad57806395d89b411161007157806395d89b41146102d2578063a457c2d7146102f0578063a9059cbb14610320578063dd62ed3e14610350578063f2fde38b1461038057610121565b806370a0823114610254578063715018a61461028457806379cc67901461028e5780638456cb59146102aa5780638da5cb5b146102b457610121565b8063313ce567116100f4578063313ce567146101c257806339509351146101e05780633f4ba83a1461021057806342966c681461021a5780635c975abb1461023657610121565b806306fdde0314610126578063095ea7b31461014457806318160ddd1461017457806323b872dd14610192575b600080fd5b61012e61039c565b60405161013b91906111f2565b60405180910390f35b61015e600480360381019061015991906112ad565b61042e565b60405161016b9190611308565b60405180910390f35b61017c610451565b6040516101899190611332565b60405180910390f35b6101ac60048036038101906101a7919061134d565b61045b565b6040516101b99190611308565b60405180910390f35b6101ca61048a565b6040516101d791906113bc565b60405180910390f35b6101fa60048036038101906101f591906112ad565b6104a1565b6040516102079190611308565b60405180910390f35b6102186104d8565b005b610234600480360381019061022f91906113d7565b6104ea565b005b61023e6104fe565b60405161024b9190611308565b60405180910390f35b61026e60048036038101906102699190611404565b610515565b60405161027b9190611332565b60405180910390f35b61028c61055d565b005b6102a860048036038101906102a391906112ad565b610571565b005b6102b2610591565b005b6102bc6105a3565b6040516102c99190611440565b60405180910390f35b6102da6105cd565b6040516102e791906111f2565b60405180910390f35b61030a600480360381019061030591906112ad565b61065f565b6040516103179190611308565b60405180910390f35b61033a600480360381019061033591906112ad565b6106d6565b6040516103479190611308565b60405180910390f35b61036a6004803603810190610365919061145b565b6106f9565b6040516103779190611332565b60405180910390f35b61039a60048036038101906103959190611404565b610780565b005b6060600380546103ab906114ca565b80601f01602080910402602001604051908101604052809291908181526020018280546103d7906114ca565b80156104245780601f106103f957610100808354040283529160200191610424565b820191906000526020600020905b81548152906001019060200180831161040757829003601f168201915b5050505050905090565b600080610439610808565b9050610446818585610810565b600191505092915050565b6000600654905090565b600080610466610808565b90506104738582856109d9565b61047e858585610a65565b60019150509392505050565b6000600560159054906101000a900460ff16905090565b6000806104ac610808565b90506104cd8185856104be85896106f9565b6104c8919061152a565b610810565b600191505092915050565b6104e0610cdb565b6104e8610d59565b565b6104fb6104f5610808565b82610dbc565b50565b6000600560009054906101000a900460ff16905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610565610cdb565b61056f6000610f89565b565b6105838261057d610808565b836109d9565b61058d8282610dbc565b5050565b610599610cdb565b6105a161104f565b565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546105dc906114ca565b80601f0160208091040260200160405190810160405280929190818152602001828054610608906114ca565b80156106555780601f1061062a57610100808354040283529160200191610655565b820191906000526020600020905b81548152906001019060200180831161063857829003601f168201915b5050505050905090565b60008061066a610808565b9050600061067882866106f9565b9050838110156106bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b4906115d0565b60405180910390fd5b6106ca8286868403610810565b60019250505092915050565b6000806106e1610808565b90506106ee818585610a65565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610788610cdb565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ee90611662565b60405180910390fd5b61080081610f89565b50565b505050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361087f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610876906116f4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e590611786565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109cc9190611332565b60405180910390a3505050565b60006109e584846106f9565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a5f5781811015610a51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a48906117f2565b60405180910390fd5b610a5e8484848403610810565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ad4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610acb90611884565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3a90611916565b60405180910390fd5b610b4e8383836110b2565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610bd4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcb906119a8565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cc29190611332565b60405180910390a3610cd58484846110ca565b50505050565b610ce3610808565b73ffffffffffffffffffffffffffffffffffffffff16610d016105a3565b73ffffffffffffffffffffffffffffffffffffffff1614610d57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4e90611a14565b60405180910390fd5b565b610d616110cf565b6000600560006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610da5610808565b604051610db29190611440565b60405180910390a1565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2290611aa6565b60405180910390fd5b610e37826000836110b2565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610ebd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb490611b38565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610f709190611332565b60405180910390a3610f84836000846110ca565b505050565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611057611118565b6001600560006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861109b610808565b6040516110a89190611440565b60405180910390a1565b6110ba611118565b6110c5838383610803565b505050565b505050565b6110d76104fe565b611116576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110d90611ba4565b60405180910390fd5b565b6111206104fe565b15611160576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161115790611c10565b60405180910390fd5b565b600081519050919050565b600082825260208201905092915050565b60005b8381101561119c578082015181840152602081019050611181565b60008484015250505050565b6000601f19601f8301169050919050565b60006111c482611162565b6111ce818561116d565b93506111de81856020860161117e565b6111e7816111a8565b840191505092915050565b6000602082019050818103600083015261120c81846111b9565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061124482611219565b9050919050565b61125481611239565b811461125f57600080fd5b50565b6000813590506112718161124b565b92915050565b6000819050919050565b61128a81611277565b811461129557600080fd5b50565b6000813590506112a781611281565b92915050565b600080604083850312156112c4576112c3611214565b5b60006112d285828601611262565b92505060206112e385828601611298565b9150509250929050565b60008115159050919050565b611302816112ed565b82525050565b600060208201905061131d60008301846112f9565b92915050565b61132c81611277565b82525050565b60006020820190506113476000830184611323565b92915050565b60008060006060848603121561136657611365611214565b5b600061137486828701611262565b935050602061138586828701611262565b925050604061139686828701611298565b9150509250925092565b600060ff82169050919050565b6113b6816113a0565b82525050565b60006020820190506113d160008301846113ad565b92915050565b6000602082840312156113ed576113ec611214565b5b60006113fb84828501611298565b91505092915050565b60006020828403121561141a57611419611214565b5b600061142884828501611262565b91505092915050565b61143a81611239565b82525050565b60006020820190506114556000830184611431565b92915050565b6000806040838503121561147257611471611214565b5b600061148085828601611262565b925050602061149185828601611262565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806114e257607f821691505b6020821081036114f5576114f461149b565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061153582611277565b915061154083611277565b9250828201905080821115611558576115576114fb565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006115ba60258361116d565b91506115c58261155e565b604082019050919050565b600060208201905081810360008301526115e9816115ad565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061164c60268361116d565b9150611657826115f0565b604082019050919050565b6000602082019050818103600083015261167b8161163f565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006116de60248361116d565b91506116e982611682565b604082019050919050565b6000602082019050818103600083015261170d816116d1565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061177060228361116d565b915061177b82611714565b604082019050919050565b6000602082019050818103600083015261179f81611763565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006117dc601d8361116d565b91506117e7826117a6565b602082019050919050565b6000602082019050818103600083015261180b816117cf565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061186e60258361116d565b915061187982611812565b604082019050919050565b6000602082019050818103600083015261189d81611861565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061190060238361116d565b915061190b826118a4565b604082019050919050565b6000602082019050818103600083015261192f816118f3565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061199260268361116d565b915061199d82611936565b604082019050919050565b600060208201905081810360008301526119c181611985565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006119fe60208361116d565b9150611a09826119c8565b602082019050919050565b60006020820190508181036000830152611a2d816119f1565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611a9060218361116d565b9150611a9b82611a34565b604082019050919050565b60006020820190508181036000830152611abf81611a83565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000611b2260228361116d565b9150611b2d82611ac6565b604082019050919050565b60006020820190508181036000830152611b5181611b15565b9050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b6000611b8e60148361116d565b9150611b9982611b58565b602082019050919050565b60006020820190508181036000830152611bbd81611b81565b9050919050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b6000611bfa60108361116d565b9150611c0582611bc4565b602082019050919050565b60006020820190508181036000830152611c2981611bed565b905091905056fea264697066735822122009cb3cf651bafa62d5d261b9948a4304e90328e71a8924e443fb4aa0005237e564736f6c63430008110033"    