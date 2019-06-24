import React, { Component } from 'react';


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
      onClick={this.toggleClass}
      >
      Later this week  <span> {isActive ? '' : '>'} </span>
      </button>
      <div
      className={this.state.active ? 'weekContainer': 'hidden'}
      >
        { this.props.weekWeather.map(day =>
        <div className="weekDay" key={day[0].date}>
          <h4>{day[0].date}</h4>
          {day.map(timePoint =>
          <table className="weekDayTimePoint" key={timePoint.dt}>
            <tbody>
              <tr>
                <td> { timePoint.time } </td>
                <td> <img className="weekDayIcon" src={this.props.getIcon(timePoint.weather[0].main, timePoint.time)} alt=""/></td>
                <td>{ timePoint.main.temp } &#176;C</td>
                </tr>
          </tbody>
          </table>)}
        </div>)}
      </div>
      </div>
    );
  }
}

export default WeekForecast
