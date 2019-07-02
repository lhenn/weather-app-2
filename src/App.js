import React, { Component } from 'react';
import './App.css';
import header from './header.png';
import City from './City';
import AddCity from './AddCity'
const countryCodes = require('./country_json.js');

class App extends Component {
  state = {
    cities: [],
    error: ""
  }
  addCity = (city) => {
    let cityInput = city.name;
    if(cityInput === '') this.setState({
      error:"Please search for your city above."
    })
    else {
      let countryInput = city.country !== '' ? (this.getCodeFromCountry(city.country)) : ('undefined');
      let url = "https://api.openweathermap.org/data/2.5/forecast?q="
       + cityInput + "," + countryInput + "&APPID=6c46ac8726907ad8effeff6768c2ea01";
      fetch(url, {
        method: "GET"
        })
        .then(function(response) {
          return response.json();
        })
        .then(json => {
          console.log(json);
          if(json.cod === "200") {
            if(this.state.cities.map(city => city.city.id).includes(json.city.id)) {
              this.setState({
                error:"City weather has already been found! Scroll down."
              })
            } else {
              this.setState({
                cities:[...this.state.cities, this.cleanData(json)],
                error: ""
              })
            }
          } else {
            this.setState({
              error:"City was not found. Please try a different search term.",
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  deleteCity = (id) => {
    const cities = this.state.cities.filter(city => {
      return city.city.id !== id
    });
    this.setState({
      cities: cities
    })
  }
  getCodeFromCountry = (country) => {
    let c;
    for(c in countryCodes) {
      if(countryCodes[c] === country) return c
    }
  }
  getCountryFromCode = (code) => {
    let c;
    for(c in countryCodes) {
      if(c === code) {
        return countryCodes[c]
      }
    }
  }

  cleanData(data) {
    data.city.country = this.getCountryFromCode(data.city.country);
    for(let i = 0; i < data.list.length; i++) {
      data.list[i].main.temp = this.convertToCelsius(data.list[i].main.temp);
      data.list[i]["date"] = this.getDate(data.list[i].dt_txt);
      data.list[i]["time"] = this.getTime(data.list[i].dt_txt);
      data['dayWeather'] = data.list.slice(0,7);
      data['weekWeather']= this.getWeekWeather(data.list);
    }
    return data;
  }
  convertToCelsius(temp) {
    return Math.round(temp - 273.15);
  }
  getDate(dateTime) {
    return dateTime.split(" ", 1)[0].substring(5,10);
  }
  getTime(dateTime) {
    let time = parseInt(dateTime.split(" ", 2)[1].substring(0, 2));
    if(time < 1) return "12am";
    if(time < 10) return (time + '').substring(0,1) + "am";
    if(time < 12) return time + "am";
    if(time === 12) return "12pm"
    return (time - 12) + "pm"
  }
  getWeekWeather(list) {
    let weekWeather = [];
    let dayWeather = []
    for(let i = 0; i<list.length; i++){
      if(this.getDate(list[i].dt_txt) !== this.getDate(list[0].dt_txt)){
        if(this.getTime(list[i].dt_txt) === "6am") {
          if(dayWeather.length > 0) weekWeather.push(dayWeather);
          dayWeather = [];
          dayWeather.push(list[i]);
          } else dayWeather.push(list[i]);
      }
    }
    weekWeather.shift();
    return weekWeather;
  }

  render() {
    const cityList = this.state.cities.length ? (
      this.state.cities.map(city => {
        return(
          <City key={city.city.id} city={city} deleteCity={this.deleteCity} />
        )
      })
    ) : (
      <div>No cities yet</div>
    )
    return(
      <div className="App">
        <div id="headerContainer">
          <div id="header">
            <img src={header} alt=""/>
          </div>
          <AddCity addCity={this.addCity}/>
        </div>
        <div id="errorContainer">{this.state.error}</div>
        <div className="cityListContainer">
          {cityList}
        </div>
      </div>
    );
  }
}

export default App;
