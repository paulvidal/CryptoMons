import React, { Component } from 'react';
import contractManager from "./contractManager";
import {finneyToWei, weiToEther, getDisplayPrice} from "./etherUtil";

class MyCard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      onMarket: false,
      price: null
    };

    // Get on market status
    contractManager.getContractInstance().isOnMarket(props.id, (err, result) => {
      if(result) {
        this.setState({
          onMarket: result
        });
      }
    });

    // Get card price
    contractManager.getContractInstance().getPrice(props.id, (err, result) => {
      if(result) {
        const etherPrice = weiToEther((parseInt(result)));

        this.setState({
          price: etherPrice !== 0 ? getDisplayPrice(etherPrice) : null // Price is put in ether
        });
      }
    });

    // Subscribe to OnMarket event callbacks
    contractManager.getContractInstance().OnMarket({}, (error, result) => {
      if (!error) {
        const tokenId = parseInt(result.args.tokenId);
        const price = parseInt(result.args.price);

        if (props.id === tokenId) {
          this.setState({
            onMarket: true,
            price: getDisplayPrice(weiToEther((parseInt(price))))
          });
        }
      }
    });

    // Subscribe to OffMarket event callbacks
    contractManager.getContractInstance().OffMarket({}, (error, result) => {
      if (!error) {
        const tokenId = parseInt(result.args.tokenId);

        if (props.id === tokenId) {
          this.setState({
            onMarket: false,
            price: null
          });
        }
      }
    });

    this.onClick.bind(this);
  }

  onClick (id, onMarket) {
    if (onMarket) {

      let price = null;

      // Price needs to be positive integer
      while (price === null || isNaN(price) || price <= 0) {
        const input = prompt('Enter the price to sell in finney (1 ether = 1000 finney)');

        if (input === null) {
          // Cancel has been pressed
          return;
        }

        price = parseInt(input);
      }

      let priceInWei = finneyToWei(price); // Price is put in wei for storage

      // Put CryptoMon on market
      contractManager.getContractInstance().putOnMarket(id, priceInWei, {
        gas: 300000,
        from: web3.eth.accounts[0]
      }, (err, result) => {
        if (result) {
          alert('CryptoMon is being put on market! Please way a few minutes before it is available to other users');
        }
      });

    } else {
      // Put CryptoMon off market
      contractManager.getContractInstance().takeOffMarket(id, {
        gas: 300000,
        from: web3.eth.accounts[0]
      }, (err, result) => {
        if (result) {
          alert('CryptoMon is being taken off market. Please way a few minutes before it is not available to other users');
        }
      });
    }
  }

  render () {
    let src = 'public/img/' + this.props.id + '.jpg';

    let sellButton = <button type="button" className="btn btn-success col-xs-12" onClick={() => this.onClick(this.props.id, true)}>Sell</button>;
    let onSaleButton = <button type="button" className="btn btn-danger col-xs-12" onClick={() => this.onClick(this.props.id, false)}>Stop sell</button>;

    return (
      <section className="col-xs-12 col-sm-6 col-md-3 gallery-item">
        <a href="#" className="thumbnail">
          <img className="photo" src={src}/>
          <div className="card-infos row">
            {this.state.price !== null ? <p>Price: {this.state.price} ether</p> : <p>No price information</p>}
            {this.state.onMarket ? onSaleButton : sellButton}
          </div>
        </a>
      </section>
    );
  }
}

export default MyCard;