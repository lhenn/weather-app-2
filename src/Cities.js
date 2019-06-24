import React, { Component } from 'react';
import WeekForecast from './WeekForecast'
import clear from './clear.png';
import clouds from './clouds.png';
import rain from './rain.png';
import clearNight from './clear-night.png';
import cloudsNight from './clouds-night.png';


class Cities extends Component {
  constructor(props){
    super(props);
    this.state = {
      cityData:[],
      expandedLocations: []
    };
  }

  componentDidMount() {
    for(let i =0; i<this.props.cities.length; i++) {
      this.getCityData(this.props.cities[i].name);
    }
  }

  async getCityData (city) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",undefined&APPID=6c46ac8726907ad8effeff6768c2ea01";
    let data = await fetch(url, {
      method: "GET"
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch(err => console.error(err))
      this.cleanData(data);
      let cityData = [...this.state.cityData, data];
      this.setState({
        cityData:cityData
      })
      console.log(this.state.cityData)
    }

    cleanData(data) {
      for(let i = 0; i < data.list.length; i++) {
        data.list[i].main.temp = this.convertToCelsius(data.list[i].main.temp);
        data.list[i]["date"] = this.getDate(data.list[i].dt_txt);
        data.list[i]["time"] = this.getTime(data.list[i].dt_txt);
        data['currentWeather'] = data.list[0];
        data['dayWeather'] = data.list.slice(1,7);
        data['weekWeather']= this.getWeekWeather(data.list);
      }
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
    getIcon = (description, time) => {
      let nightTimes = ['9pm', '12am', '3am'];
      if(description === 'Rain') return rain;
      if(nightTimes.includes(time)){
        if(description === 'Clear') return clearNight;
        if(description === 'Clouds') return cloudsNight;
      } else {
        if(description === 'Clear') return clear;
        if(description === 'Clouds') return clouds;
      }
    }

  render() {
    const { cityData } = this.state;
    return (
      <div className="cityListContainer">
        { cityData.map(city =>
        <div className="cityContainer" key ={city.city.name}>
          <h1>{city.city.name}</h1>
          <h4> Today, { city.currentWeather.date } </h4>
          <div className="dayContainer">
            <div className="currentWeather">
              Now
              <img className="icon" src={this.getIcon(city.currentWeather.weather[0].main, city.currentWeather.time)} alt=""/>
              {city.currentWeather.main.temp} &#176;C
            </div>
            <div className="dayWeather">
              { city.dayWeather.map(timePoint =>
                <div className="timePoint" key={timePoint.dt}>
                  { timePoint.time }
                  <img className="icon" src={this.getIcon(timePoint.weather[0].main, timePoint.time)} alt=""/>
                { timePoint.main.temp } &#176;C
              </div>
            )}
          </div>
          </div>
          <WeekForecast weekWeather = {city.weekWeather} getIcon = { this.getIcon }/>
        </div>)}
      </div>
    );
  }
}

export default Cities
