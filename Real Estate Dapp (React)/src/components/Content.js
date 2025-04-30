import React, { Component } from 'react';
import AddLand from './AddLand';
import LandsForSale from './LandsForSale';
import ListLand from './ListLand';
import SoldLands from './SoldLands';

class Content extends Component {
  render() {
    const { addLand, lands, buyLand, account, toggleLandSaleStatus } = this.props
    return (
      <div id="content">
        <p></p>
        <AddLand addLand={addLand} />
        <p>&nbsp;</p>
        <LandsForSale lands={lands} buyLand={buyLand} account={account} />
        <p>&nbsp;</p>
        <ListLand toggleLandSaleStatus={toggleLandSaleStatus} />
        <p>&nbsp;</p>
        <SoldLands lands={lands} account={account} toggleLandSaleStatus={toggleLandSaleStatus} />
      </div>
    )
  }
}

export default Content
