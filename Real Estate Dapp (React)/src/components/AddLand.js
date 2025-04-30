import React, { Component } from 'react'

export class AddLand extends Component {
  state = {
    location: '',
    value: '',
    propertyType: '',
    bedrooms: '',
    error: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    try {
      const { location, value, propertyType, bedrooms } = this.state
      if (!location || !value || !propertyType) {
        throw new Error('Please fill in all fields')
      }
      if (isNaN(value) || value <= 0) {
        throw new Error('Please enter a valid price')
      }
      if (propertyType === 'Apartment') {
        if (!bedrooms || isNaN(bedrooms) || bedrooms <= 0) {
          throw new Error('Please enter a valid number of bedrooms for the apartment')
        }
      }
      const weiValue = window.web3.utils.toWei(value.toString(), 'Ether')
      this.props.addLand(location, weiValue, propertyType, propertyType === 'Apartment' ? bedrooms : undefined)
      // Clear form
      this.setState({ location: '', value: '', propertyType: '', bedrooms: '' })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  
  render() {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Add New Property</h2>
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="location">Property Location</label>
              <input
                id="location"
                type="text"
                value={this.state.location}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter property location..."
                required />
            </div>
            <div className="form-group">
              <label htmlFor="propertyType">Property Type</label>
              <select
                id="propertyType"
                value={this.state.propertyType}
                onChange={this.handleChange}
                className="form-control"
                required
              >
                <option value="">Select property type...</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
            {this.state.propertyType === 'Apartment' && (
              <div className="form-group">
                <label htmlFor="bedrooms">Number of Bedrooms</label>
                <input
                  id="bedrooms"
                  type="number"
                  min="1"
                  value={this.state.bedrooms}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter number of bedrooms..."
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="value">Property Value (in ETH)</label>
              <input
                id="value"
                type="number"
                step="0.01"
                value={this.state.value}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter property value in ETH..."
                required />
            </div>
            <button type="submit" className="btn btn-primary">Add Property</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddLand
