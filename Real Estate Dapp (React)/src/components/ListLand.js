import React, { Component } from 'react'

class ListLand extends Component {

  state = {
    id: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h2>Toggle Land Sale Status</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.state.id
          this.props.toggleLandSaleStatus(id)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="id"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Land ID.."
              required />
          </div>
          <button type="submit" className="btn btn-primary">Toggle Sale Status</button>
        </form>
      </div>
    )
  }
}

export default ListLand
