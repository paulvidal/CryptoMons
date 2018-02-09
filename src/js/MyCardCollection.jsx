import React, { Component } from 'react';
import MyCard from './MyCard.jsx'
import contractManager from "./contractManager";
import {weiToEther, getDisplayPrice} from "./etherUtil";

class MyCardCollection extends Component {

  constructor (props) {
    super(props);

    this.state = {
      cards: [],
      sellBalance: 0
    };

    this.fetchCards.bind(this);
    this.onWithdraw.bind(this);
    this.fetchBalance(this);

    // Fetch owners cards
    this.fetchCards();

    // Get account balance
    this.fetchBalance();

    // Subscribe to Transfer event callbacks
    contractManager.getContractInstance().Transfer({}, (error, result) => {
      console.dir(result);
      console.dir(web3.eth.accounts[0]);

      if (!error) {
        const newOwner = result.args.to;
        const oldOwner = result.args.from;

        if (newOwner === web3.eth.accounts[0] || oldOwner === web3.eth.accounts[0]) {
          // Fetch owners cards if his address is included in the transfer
          this.fetchCards();

          // Update balance
          this.fetchBalance();
        }
      }
    });

    // Subscribe to Withdraw event callbacks
    contractManager.getContractInstance().Withdraw({}, (error, result) => {
      if (!error) {
        const withdrawAddress = result.args.from;

        if (withdrawAddress === web3.eth.accounts[0]) {
          this.setState({
            sellBalance: 0
          });
        }
      }
    });
  }

  fetchCards() {
    contractManager.getContractInstance().getMyCryptoMons({
      from: web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        this.setState({
          cards: _.map(result, (id) => parseInt(id))
        });
      }
    });
  }

  fetchBalance() {
    contractManager.getContractInstance().getBalanceToWithdraw({
      from: web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        this.setState({
          sellBalance: weiToEther(parseInt(result)) // Price is put in ether
        });
      }
    });
  }

  onWithdraw() {
    contractManager.getContractInstance().withdrawBalance({
      gas: 300000,
      from: web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        alert('Your account is being updated! Please way a few minutes');
      }
    });
  }

  render () {
    const sellBalanceEmpty = <button type="button" className="btn btn-primary pull-left col-xs-12 col-sm-3" disabled="disabled">Withdraw balance</button>;
    const sellBalancePositive = <button type="button" className="btn btn-warning pull-left col-xs-12 col-sm-3" onClick={() => this.onWithdraw()}>Withdraw balance</button>;

    return (
      <article className="gallery container-fluid">
        <section className="col-xs-12 withdraw">
          {this.state.sellBalance > 0 ? sellBalancePositive : sellBalanceEmpty}
          <p className="pull-left balance col-xs-12 col-sm-9">Sell Balance: {getDisplayPrice(this.state.sellBalance)} ether</p>
        </section>

        {
          _.map(this.state.cards, id => {
            return (
              <MyCard
                key={id}
                id={id}
              />
            );
          })
        }
      </article>
    );
  }
}

export default MyCardCollection;