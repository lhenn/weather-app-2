import React, { Component } from 'react';

class AddCity extends Component {
  state = {
    name: '',
    country:''
  }
  handleCityChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleCountryChange = (e) => {
    this.setState({
      country: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCity(this.state);
    this.setState({
      name:'',
      country:''
    });
  }
  render() {
    return(
      <div>
        <form id="searchbar" onSubmit={this.handleSubmit} >
          <input
            id="city-input"
            type="text"
            onChange={this.handleCityChange}
            value={this.state.name}
            placeholder="Find another city..."
            />
          <input
            id="country-input"
            type="text"
            onChange={this.handleCountryChange}
            value={this.state.country}
            placeholder="Country"
            />
          <button id="searchbutton">Search</button>
        </form>
      </div>
    )
  }
}
export default AddCity
