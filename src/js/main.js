import React from 'react';
import ReactDOM from 'react-dom';
import OnSaleCardCollection from "./OnSaleCardCollection.jsx";
import contractManager from "./contractManager";
import MyCardCollection from "./MyCardCollection.jsx";

$( document ).ready(() => {

  // Check if has valid web3 application
  if (!contractManager.validateWeb3()) {
    return;
  }

  let contractInstance = contractManager.getContractInstance();

  // Add the cards for the main collection
  contractInstance.totalSupply((err, result) => {
    if(result) {
      const totalCards = parseInt(result);
      ReactDOM.render(<OnSaleCardCollection totalCards={totalCards}/>, document.getElementById('buy-tab'));
    }
  });

  // Add the cards for private user collection
  ReactDOM.render(<MyCardCollection />, document.getElementById('my-tab'));
});