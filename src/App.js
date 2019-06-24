import React, { Component } from 'react';
import './App.css';
import header from './header.png';
import Cities from './Cities'

class App extends Component {
  state = {
    cities: [
      {id: 1, name: "Amsterdam"},
      //{id: 2, name: "Mill Valley"},
      {id: 3, name: "Barcelona"}
    ]
  }
  render() {
  return (
    <div className="App">
    <div id="headerContainer">
      <div id="header"><img src={header} alt=""/></div>
      <div id="searchbar">
          <input id="city-input" type="text" placeholder="Find another city..."></input>
          <input id="country-input" type="text" placeholder="Country"></input>
          <button id="searchbutton" >Search</button>
      </div>
    </div>

    <Cities cities={this.state.cities}/>
    </div>

  );
}
}

export default App;
