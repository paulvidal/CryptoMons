import React, { Component } from 'react';
import OnSaleCard from './OnSaleCard.jsx';
import contractManager from "./contractManager";

class OnSaleCardCollection extends Component {

  constructor (props) {
    super(props);

    this.state = {
      myCards: []
    };

    contractManager.getContractInstance().getMyCryptoMons({
      from: web3.eth.accounts[0]
    }, (err, result) => {
      if(result) {
        this.setState({
          myCards: _.map(result, (id) => parseInt(id))
        });
      }
    });
  }

  render () {
    let cardRange = _.range(1, this.props.totalCards+1);

    return (
      <article className="gallery container-fluid">
        {
          _.map(cardRange, id => {
            return (
              <OnSaleCard
                key={id}
                id={id}
                myCard={this.state.myCards.includes(id)}
              />
            );
          })
        }
      </article>
    );
  }
}

export default OnSaleCardCollection;