import React, { Component } from 'react';
import TimePoint from './TimePoint'
import WeekForecast from './WeekForecast'

class City extends Component {

  render() {
    const cityData = this.props.city;
      return (
        <div className="cityContainer" key={cityData.city.id}>
          <div className="cityHeader">
            <h1>{cityData.city.name}, {cityData.city.country}</h1>
            <button onClick={()=>this.props.deleteCity(cityData.city.id)}>&times;</button>
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
}

export default City
