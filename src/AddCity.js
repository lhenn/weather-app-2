import React, { Component } from 'react';

class AddCity extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCity(this.state);
    this.setState({
      name:''
    });
  }
  render() {
    return(
      <div>
        <form id="searchbar" onSubmit={this.handleSubmit} >
          <input
            id="city-input"
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
            placeholder="Find another city..."
            />
          <input id="country-input" type="text" placeholder="Country"></input>
          <button id="searchbutton">Search</button>
        </form>
      </div>
    )
  }
}
export default AddCity
