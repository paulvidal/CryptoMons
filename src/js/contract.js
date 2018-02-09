const contract = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "supply",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      }
    ],
    "name": "getPrice",
    "outputs": [
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "putOnMarket",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      }
    ],
    "name": "isOnMarket",
    "outputs": [
      {
        "name": "onMarket",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdrawBalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      }
    ],
    "name": "takeOffMarket",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint8"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBalanceToWithdraw",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMyCryptoMons",
    "outputs": [
      {
        "name": "",
        "type": "uint8[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokenId",
        "type": "uint8"
      },
      {
        "indexed": false,
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "OnMarket",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokenId",
        "type": "uint8"
      }
    ],
    "name": "OffMarket",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokenId",
        "type": "uint8"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

export default contract;