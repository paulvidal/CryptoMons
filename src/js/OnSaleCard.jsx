import React, { Component } from 'react';
import contractManager from "./contractManager";
import {weiToEther, etherToWei, getDisplayPrice} from "./etherUtil";

class OnSaleCard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      onMarket: false,
      price: null
    };

    // Get on market status
    contractManager.getContractInstance().isOnMarket(this.props.id, (err, result) => {
      if(result !== null) {
        this.setState({
          onMarket: result
        });
      }
    });

    // Get card price
    contractManager.getContractInstance().getPrice(this.props.id, (err, result) => {
      if(result !== null) {
        this.setState({
          price: getDisplayPrice(weiToEther((parseInt(result)))) // Price is put in ether
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

    // Subscribe to Transfer event callbacks
    contractManager.getContractInstance().Transfer({}, (error, result) => {
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

  onClick (id, price) {
    contractManager.getContractInstance().transfer(id, {
      gas: 300000,
      from: web3.eth.accounts[0],
      value: etherToWei(price)
    }, (err, result) => {
      if(result) {
        alert('Acquisition is underway! Please way a few minutes before making sure your CrytoMon is acquired');
      }
    });
  }

  render () {
    let src = 'public/img/' + this.props.id + '.jpg';

    let buyButton = <button type="button" className="btn btn-success col-xs-12" onClick={() => this.onClick(this.props.id, this.state.price)}>Buy</button>;
    let buyButtonDisabled = <button type="button" className="btn btn-danger col-xs-12" disabled="disabled">Not available</button>;

    return (
      <section className="col-xs-12 col-sm-6 col-md-3 gallery-item">
        <a href="#" className="thumbnail">
          <img className="photo" src={src}/>
          <div className="card-infos row">
            {this.state.price !== null && this.state.onMarket ? <p>Price: {this.state.price} ether</p> : <p>No price information</p>}
            {this.props.myCard || !this.state.onMarket ? buyButtonDisabled : buyButton}
          </div>
        </a>
      </section>
    );
  }
}

export default OnSaleCard;