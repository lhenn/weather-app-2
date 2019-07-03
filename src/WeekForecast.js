import React, { Component } from 'react';
import Icon from './Icon';

class WeekForecast extends Component {
  constructor(props){
    super(props);
    this.state = {
            active: false,
        };
  }
  toggleClass = (e) => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
  };

  render() {
    const isActive = this.state.active;
    return (
      <div>
      <button
      className="weekForecastButton"
      onClick={this.toggleClass}
      >
      Later this week  <span> {isActive ? '' : '>'} </span>
      </button>
      <div
      className={this.state.active ? 'weekContainer': 'hidden'}
      >
        { this.props.weekWeather.map(day => this.createWeekDay(day))}
      </div>
      </div>
    );
  }

  createWeekDay = (day) => {
    return (
      <div className="weekDay" key={day[0].date}>
        <h4>{day[0].date}</h4>
        {day.map(timePoint =>
        <table className="weekDayTable" key={timePoint.dt}>
          <tbody>
            <tr>
              <td> { timePoint.time } </td>
              <td>
                <Icon
                  className="weekDayIcon"
                  description={timePoint.weather[0].main}
                  time={timePoint.time}
                  size="small"
                />
              </td>
              <td>{ this.props.convertTempUnit(this.props.unit, timePoint.main.temp) } </td>
              </tr>
        </tbody>
        </table>)}
      </div>
    )
  }
}

export default WeekForecast
