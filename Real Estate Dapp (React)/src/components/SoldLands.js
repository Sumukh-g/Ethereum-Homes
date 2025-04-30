import React, { Component } from 'react'

const showSoldLands = (lands, toggleLandSaleStatus, account) => {
  const soldLands = lands.filter(land => land.isForSale === false)
  return (
    soldLands.map((land) => {
      return (
        <tr key={land.id}>
          <th scope="row">{land.id.toString()}</th>
          <td>{land.location}</td>
          <td>{window.web3.utils.fromWei(land.price.toString(), 'Ether')} Eth</td>
          <td>{land.owner}</td>
          { land.owner === account ? 
            <td>
              <button 
                className="btn btn-primary"
                onClick={() => toggleLandSaleStatus(land.id)} 
              >
                List For Sale
              </button>
            </td> : 
            <td><strong>Not Your Land</strong></td>
          } 
        </tr>
      )
    })
  )
}

class SoldLands extends Component {
  render() {
    const { lands, toggleLandSaleStatus, account } = this.props;
    return (
      <div>
        <h2>Out of Market</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Location</th>
              <th scope="col">Value</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="landList">
            { showSoldLands(lands, toggleLandSaleStatus, account) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default SoldLands


