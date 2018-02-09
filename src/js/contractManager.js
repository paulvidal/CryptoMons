import Web3 from 'web3';
import contract from './contract'

let contractInstance = null;

function validateWeb3() {
  if(typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
    return true;
  }

  alert("No application such as Metamask detected (please download one in order for the application to work at https://metamask.io/)");
  return false;
}

function getContractInstance() {
  if (contractInstance) {
    return contractInstance;
  }

  // Lazily initialised contract
  let myContract = web3.eth.contract(contract);
  contractInstance = myContract.at("0xfeca3f68421e956f70794510114779c88f4f9e58");
  return contractInstance
}

export default {
  validateWeb3,
  getContractInstance
}