export const MINTABLE_PAUSEABLE_ABI = [
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
      "name": "mint",
      "outputs": [],
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


export const MINTABLE_PAUSEABLE_BYTECODE = "0x60806040523480156200001157600080fd5b506040516200282f3803806200282f833981810160405281019062000037919062000605565b838381600390816200004a9190620008f6565b5080600490816200005c9190620008f6565b5050506000600560006101000a81548160ff0219169083151502179055506200009a6200008e6200010460201b60201c565b6200010c60201b60201c565b81600560156101000a81548160ff021916908360ff16021790555080600681905550620000fa33620000d1620001d260201b60201c565b600a620000df919062000b60565b600654620000ee919062000bb1565b620001e960201b60201c565b5050505062000d5a565b600033905090565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600560159054906101000a900460ff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200025b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002529062000c5d565b60405180910390fd5b6200026f600083836200035660201b60201c565b806002600082825462000283919062000c7f565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000336919062000ccb565b60405180910390a362000352600083836200038360201b60201c565b5050565b620003666200038860201b60201c565b6200037e838383620003dd60201b620007be1760201c565b505050565b505050565b62000398620003e260201b60201c565b15620003db576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003d29062000d38565b60405180910390fd5b565b505050565b6000600560009054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620004628262000417565b810181811067ffffffffffffffff8211171562000484576200048362000428565b5b80604052505050565b600062000499620003f9565b9050620004a7828262000457565b919050565b600067ffffffffffffffff821115620004ca57620004c962000428565b5b620004d58262000417565b9050602081019050919050565b60005b8381101562000502578082015181840152602081019050620004e5565b60008484015250505050565b6000620005256200051f84620004ac565b6200048d565b90508281526020810184848401111562000544576200054362000412565b5b62000551848285620004e2565b509392505050565b600082601f8301126200057157620005706200040d565b5b8151620005838482602086016200050e565b91505092915050565b600060ff82169050919050565b620005a4816200058c565b8114620005b057600080fd5b50565b600081519050620005c48162000599565b92915050565b6000819050919050565b620005df81620005ca565b8114620005eb57600080fd5b50565b600081519050620005ff81620005d4565b92915050565b6000806000806080858703121562000622576200062162000403565b5b600085015167ffffffffffffffff81111562000643576200064262000408565b5b620006518782880162000559565b945050602085015167ffffffffffffffff81111562000675576200067462000408565b5b620006838782880162000559565b93505060406200069687828801620005b3565b9250506060620006a987828801620005ee565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200070857607f821691505b6020821081036200071e576200071d620006c0565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620007887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000749565b62000794868362000749565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620007d7620007d1620007cb84620005ca565b620007ac565b620005ca565b9050919050565b6000819050919050565b620007f383620007b6565b6200080b6200080282620007de565b84845462000756565b825550505050565b600090565b6200082262000813565b6200082f818484620007e8565b505050565b5b8181101562000857576200084b60008262000818565b60018101905062000835565b5050565b601f821115620008a657620008708162000724565b6200087b8462000739565b810160208510156200088b578190505b620008a36200089a8562000739565b83018262000834565b50505b505050565b600082821c905092915050565b6000620008cb60001984600802620008ab565b1980831691505092915050565b6000620008e68383620008b8565b9150826002028217905092915050565b6200090182620006b5565b67ffffffffffffffff8111156200091d576200091c62000428565b5b620009298254620006ef565b620009368282856200085b565b600060209050601f8311600181146200096e576000841562000959578287015190505b620009658582620008d8565b865550620009d5565b601f1984166200097e8662000724565b60005b82811015620009a85784890151825560018201915060208501945060208101905062000981565b86831015620009c85784890151620009c4601f891682620008b8565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111562000a6b5780860481111562000a435762000a42620009dd565b5b600185161562000a535780820291505b808102905062000a638562000a0c565b945062000a23565b94509492505050565b60008262000a86576001905062000b59565b8162000a96576000905062000b59565b816001811462000aaf576002811462000aba5762000af0565b600191505062000b59565b60ff84111562000acf5762000ace620009dd565b5b8360020a91508482111562000ae95762000ae8620009dd565b5b5062000b59565b5060208310610133831016604e8410600b841016171562000b2a5782820a90508381111562000b245762000b23620009dd565b5b62000b59565b62000b39848484600162000a19565b9250905081840481111562000b535762000b52620009dd565b5b81810290505b9392505050565b600062000b6d82620005ca565b915062000b7a836200058c565b925062000ba97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000a74565b905092915050565b600062000bbe82620005ca565b915062000bcb83620005ca565b925082820262000bdb81620005ca565b9150828204841483151762000bf55762000bf4620009dd565b5b5092915050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062000c45601f8362000bfc565b915062000c528262000c0d565b602082019050919050565b6000602082019050818103600083015262000c788162000c36565b9050919050565b600062000c8c82620005ca565b915062000c9983620005ca565b925082820190508082111562000cb45762000cb3620009dd565b5b92915050565b62000cc581620005ca565b82525050565b600060208201905062000ce2600083018462000cba565b92915050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b600062000d2060108362000bfc565b915062000d2d8262000ce8565b602082019050919050565b6000602082019050818103600083015262000d538162000d11565b9050919050565b611ac58062000d6a6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806370a08231116100a257806395d89b411161007157806395d89b41146102ab578063a457c2d7146102c9578063a9059cbb146102f9578063dd62ed3e14610329578063f2fde38b1461035957610116565b806370a0823114610249578063715018a6146102795780638456cb59146102835780638da5cb5b1461028d57610116565b8063313ce567116100e9578063313ce567146101b757806339509351146101d55780633f4ba83a1461020557806340c10f191461020f5780635c975abb1461022b57610116565b806306fdde031461011b578063095ea7b31461013957806318160ddd1461016957806323b872dd14610187575b600080fd5b610123610375565b6040516101309190611136565b60405180910390f35b610153600480360381019061014e91906111f1565b610407565b604051610160919061124c565b60405180910390f35b61017161042a565b60405161017e9190611276565b60405180910390f35b6101a1600480360381019061019c9190611291565b610434565b6040516101ae919061124c565b60405180910390f35b6101bf610463565b6040516101cc9190611300565b60405180910390f35b6101ef60048036038101906101ea91906111f1565b61047a565b6040516101fc919061124c565b60405180910390f35b61020d6104b1565b005b610229600480360381019061022491906111f1565b6104c3565b005b6102336104d9565b604051610240919061124c565b60405180910390f35b610263600480360381019061025e919061131b565b6104f0565b6040516102709190611276565b60405180910390f35b610281610538565b005b61028b61054c565b005b61029561055e565b6040516102a29190611357565b60405180910390f35b6102b3610588565b6040516102c09190611136565b60405180910390f35b6102e360048036038101906102de91906111f1565b61061a565b6040516102f0919061124c565b60405180910390f35b610313600480360381019061030e91906111f1565b610691565b604051610320919061124c565b60405180910390f35b610343600480360381019061033e9190611372565b6106b4565b6040516103509190611276565b60405180910390f35b610373600480360381019061036e919061131b565b61073b565b005b606060038054610384906113e1565b80601f01602080910402602001604051908101604052809291908181526020018280546103b0906113e1565b80156103fd5780601f106103d2576101008083540402835291602001916103fd565b820191906000526020600020905b8154815290600101906020018083116103e057829003601f168201915b5050505050905090565b6000806104126107c3565b905061041f8185856107cb565b600191505092915050565b6000600654905090565b60008061043f6107c3565b905061044c858285610994565b610457858585610a20565b60019150509392505050565b6000600560159054906101000a900460ff16905090565b6000806104856107c3565b90506104a681858561049785896106b4565b6104a19190611441565b6107cb565b600191505092915050565b6104b9610c96565b6104c1610d14565b565b6104cb610c96565b6104d58282610d77565b5050565b6000600560009054906101000a900460ff16905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610540610c96565b61054a6000610ecd565b565b610554610c96565b61055c610f93565b565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060048054610597906113e1565b80601f01602080910402602001604051908101604052809291908181526020018280546105c3906113e1565b80156106105780601f106105e557610100808354040283529160200191610610565b820191906000526020600020905b8154815290600101906020018083116105f357829003601f168201915b5050505050905090565b6000806106256107c3565b9050600061063382866106b4565b905083811015610678576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066f906114e7565b60405180910390fd5b61068582868684036107cb565b60019250505092915050565b60008061069c6107c3565b90506106a9818585610a20565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610743610c96565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a990611579565b60405180910390fd5b6107bb81610ecd565b50565b505050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361083a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108319061160b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a09061169d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109879190611276565b60405180910390a3505050565b60006109a084846106b4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a1a5781811015610a0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0390611709565b60405180910390fd5b610a1984848484036107cb565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a869061179b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610afe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af59061182d565b60405180910390fd5b610b09838383610ff6565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b86906118bf565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610c7d9190611276565b60405180910390a3610c9084848461100e565b50505050565b610c9e6107c3565b73ffffffffffffffffffffffffffffffffffffffff16610cbc61055e565b73ffffffffffffffffffffffffffffffffffffffff1614610d12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d099061192b565b60405180910390fd5b565b610d1c611013565b6000600560006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610d606107c3565b604051610d6d9190611357565b60405180910390a1565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610de6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddd90611997565b60405180910390fd5b610df260008383610ff6565b8060026000828254610e049190611441565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610eb59190611276565b60405180910390a3610ec96000838361100e565b5050565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610f9b61105c565b6001600560006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610fdf6107c3565b604051610fec9190611357565b60405180910390a1565b610ffe61105c565b6110098383836107be565b505050565b505050565b61101b6104d9565b61105a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161105190611a03565b60405180910390fd5b565b6110646104d9565b156110a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109b90611a6f565b60405180910390fd5b565b600081519050919050565b600082825260208201905092915050565b60005b838110156110e05780820151818401526020810190506110c5565b60008484015250505050565b6000601f19601f8301169050919050565b6000611108826110a6565b61111281856110b1565b93506111228185602086016110c2565b61112b816110ec565b840191505092915050565b6000602082019050818103600083015261115081846110fd565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006111888261115d565b9050919050565b6111988161117d565b81146111a357600080fd5b50565b6000813590506111b58161118f565b92915050565b6000819050919050565b6111ce816111bb565b81146111d957600080fd5b50565b6000813590506111eb816111c5565b92915050565b6000806040838503121561120857611207611158565b5b6000611216858286016111a6565b9250506020611227858286016111dc565b9150509250929050565b60008115159050919050565b61124681611231565b82525050565b6000602082019050611261600083018461123d565b92915050565b611270816111bb565b82525050565b600060208201905061128b6000830184611267565b92915050565b6000806000606084860312156112aa576112a9611158565b5b60006112b8868287016111a6565b93505060206112c9868287016111a6565b92505060406112da868287016111dc565b9150509250925092565b600060ff82169050919050565b6112fa816112e4565b82525050565b600060208201905061131560008301846112f1565b92915050565b60006020828403121561133157611330611158565b5b600061133f848285016111a6565b91505092915050565b6113518161117d565b82525050565b600060208201905061136c6000830184611348565b92915050565b6000806040838503121561138957611388611158565b5b6000611397858286016111a6565b92505060206113a8858286016111a6565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806113f957607f821691505b60208210810361140c5761140b6113b2565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061144c826111bb565b9150611457836111bb565b925082820190508082111561146f5761146e611412565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006114d16025836110b1565b91506114dc82611475565b604082019050919050565b60006020820190508181036000830152611500816114c4565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006115636026836110b1565b915061156e82611507565b604082019050919050565b6000602082019050818103600083015261159281611556565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006115f56024836110b1565b915061160082611599565b604082019050919050565b60006020820190508181036000830152611624816115e8565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006116876022836110b1565b91506116928261162b565b604082019050919050565b600060208201905081810360008301526116b68161167a565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006116f3601d836110b1565b91506116fe826116bd565b602082019050919050565b60006020820190508181036000830152611722816116e6565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006117856025836110b1565b915061179082611729565b604082019050919050565b600060208201905081810360008301526117b481611778565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006118176023836110b1565b9150611822826117bb565b604082019050919050565b600060208201905081810360008301526118468161180a565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006118a96026836110b1565b91506118b48261184d565b604082019050919050565b600060208201905081810360008301526118d88161189c565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006119156020836110b1565b9150611920826118df565b602082019050919050565b6000602082019050818103600083015261194481611908565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611981601f836110b1565b915061198c8261194b565b602082019050919050565b600060208201905081810360008301526119b081611974565b9050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b60006119ed6014836110b1565b91506119f8826119b7565b602082019050919050565b60006020820190508181036000830152611a1c816119e0565b9050919050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b6000611a596010836110b1565b9150611a6482611a23565b602082019050919050565b60006020820190508181036000830152611a8881611a4c565b905091905056fea264697066735822122066c6df72d59097b70ce81a34c2bf3acb66972c35ebd78a6f65620dc7ee793af564736f6c63430008110033"