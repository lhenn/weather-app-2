import React, { Component } from 'react';
import TimePoint from './TimePoint'
import WeekForecast from './WeekForecast'

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      isLoaded: false,
      error: ""
    }
  }

  componentDidMount() {
    console.log("this.props.city: ",this.props.city);
    if(this.props.city.name !== "") this.getCityData(this.props.city);
    else {
      this.setState({
        error:"nothing entered",
        isLoaded:true
      })
    }
  }

  getCityData(city) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?q="
     + this.props.city.name + ",undefined&APPID=6c46ac8726907ad8effeff6768c2ea01";
    fetch(url, {
      method: "GET"
      })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        console.log(json);
        if(json.cod === "200") {
          this.setState({
            cityData:this.cleanData(json),
            isLoaded:true
          })
        } else {
          console.log("problemo")
          this.setState({
            error:"city not found",
            isLoaded:true
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  cleanData(data) {
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
    console.log(this.state.isLoaded, this.state.error);
    const {cityData} = this.state;
    if (this.state.isLoaded && this.state.error === "") {
      return (
        <div className="cityContainer" key={cityData.city.id}>
          <div className="cityHeader">
            <h1>{cityData.city.name}, {cityData.city.country}</h1>
            <button>&times;</button>
          </div>
          <h4>Today, {cityData.list[0].date}</h4>
          <div className="dayContainer">
            {cityData.dayWeather.map(timePoint =>
              <TimePoint key={timePoint.dt}
              time={timePoint.time}
              description={timePoint.weather[0].main}
              temperature={timePoint.main.temp}
              />
            )}
          </div>
          <WeekForecast weekWeather={cityData.weekWeather} />
        </div>
      )
    }
    if(this.state.isLoaded && this.state.error !== "")
    return (
      <div> { this.state.error } </div>
    )
    return(
      <div>Loading ...</div>
    )

  }
}

export default City
