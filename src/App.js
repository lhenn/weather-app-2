import React, { Component } from 'react';
import './App.css';
import header from './header.png';
import City from './City';
import AddCity from './AddCity'

class App extends Component {
  state = {
    cities: [
      {id: 1, name: "Amsterdam"},
      //{id: 2, name: "Mill Valley"},
      {id: 2, name: "Barcelona"}
    ]
  }
  addCity = (city) => {
    city.id=this.state.cities.length + 1;
    let cities = [...this.state.cities, city];
    this.setState({
      cities:cities
    })
    console.log("added ", city);
    console.log("all cities: ", this.state.cities)
    //document.location.reload();
  }

  render() {
  return(
    <div className="App">
      <div id="headerContainer">
        <div id="header">
          <img src={header} alt=""/>
        </div>
        <AddCity addCity={this.addCity}/>
      </div>
      <div className="cityListContainer">
        {this.state.cities.map(city => this.createCityList(city))}
      </div>
    </div>
  );
  }

  createCityList = (city) => {
    return(
      <City key={city.id} city={city} />
    )
  }

}

export default App;
