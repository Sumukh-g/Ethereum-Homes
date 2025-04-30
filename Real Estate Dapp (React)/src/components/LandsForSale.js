import React, { Component } from 'react'

const showLandsForSale = (lands, buyLand, account, filters) => {
  let landsForSale = lands.filter(land => land.isForSale === true)
  
  // Apply filters
  if (filters.location) {
    landsForSale = landsForSale.filter(land => 
      land.location.toLowerCase().includes(filters.location.toLowerCase())
    )
  }
  
  if (filters.propertyType) {
    landsForSale = landsForSale.filter(land => 
      land.propertyType === filters.propertyType
    )
  }
  
  if (filters.minPrice) {
    const minPriceWei = window.web3.utils.toWei(filters.minPrice.toString(), 'Ether')
    landsForSale = landsForSale.filter(land => 
      window.web3.utils.toBN(land.price).gte(window.web3.utils.toBN(minPriceWei))
    )
  }
  
  if (filters.maxPrice) {
    const maxPriceWei = window.web3.utils.toWei(filters.maxPrice.toString(), 'Ether')
    landsForSale = landsForSale.filter(land => 
      window.web3.utils.toBN(land.price).lte(window.web3.utils.toBN(maxPriceWei))
    )
  }

  return (
    landsForSale.map((land) => {
      return (
        <tr key={land.id}>
          <th scope="row">{land.id.toString()}</th>
          <td>{land.location}</td>
          <td>{land.propertyType === 'Apartment' && land.bedrooms ? `Apartment (${land.bedrooms} bedrooms)` : land.propertyType}</td>
          <td>{window.web3.utils.fromWei(land.price.toString(), 'Ether')} Eth</td>
          <td>{land.owner}</td>
          {
            land.owner !== account ? 
            <td>
              <button 
                className="btn btn-primary"
                onClick={() => buyLand(land.id, land.price)} 
              >
                Buy
              </button>
            </td> :
            <td><strong>Your Listing</strong></td>
          }
        </tr>
      )
    })
  )
}

class LandsForSale extends Component {
  state = {
    filters: {
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: ''
    },
    sortOrder: 'default'
  }

  handleFilterChange = (e) => {
    const { id, value } = e.target
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [id]: value
      }
    }))
  }

  clearFilters = () => {
    this.setState({
      filters: {
        location: '',
        propertyType: '',
        minPrice: '',
        maxPrice: ''
      }
    })
  }

  getSortedLands = (lands) => {
    const { sortOrder } = this.state
    let sorted = [...lands]
    if (sortOrder === 'highToLow') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price))
    } else if (sortOrder === 'lowToHigh') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    }
    return sorted
  }

  render() {
    const sortedLands = this.getSortedLands(this.props.lands)
    return (
      <div>
        <h2>Lands For Sale</h2>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Search Properties</h5>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    placeholder="Search by location..."
                    value={this.state.filters.location}
                    onChange={this.handleFilterChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <select
                    id="propertyType"
                    className="form-control"
                    value={this.state.filters.propertyType}
                    onChange={this.handleFilterChange}
                  >
                    <option value="">All Property Types</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <input
                    type="number"
                    id="minPrice"
                    className="form-control"
                    placeholder="Min Price (ETH)"
                    value={this.state.filters.minPrice}
                    onChange={this.handleFilterChange}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <input
                    type="number"
                    id="maxPrice"
                    className="form-control"
                    placeholder="Max Price (ETH)"
                    value={this.state.filters.maxPrice}
                    onChange={this.handleFilterChange}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <select
                    id="sortOrder"
                    className="form-control"
                    value={this.state.sortOrder}
                    onChange={this.handleFilterChange}
                  >
                    <option value="default">Sort by</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="lowToHigh">Price: Low to High</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <button 
                  className="btn btn-secondary"
                  onClick={this.clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Location</th>
              <th scope="col">Type</th>
              <th scope="col">Value</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="landList">
            { showLandsForSale(sortedLands, this.props.buyLand, this.props.account, this.state.filters) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default LandsForSale
