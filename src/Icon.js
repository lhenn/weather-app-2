import React, { Component }  from 'react';
import clear from './clear.png';
import clouds from './clouds.png';
import rain from './rain.png';
import clearNight from './clear-night.png';
import cloudsNight from './clouds-night.png';

class Icon extends Component {
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
    if(this.props.size === "normal"){
    return(
      <div>
        <img className="icon" src={this.getIcon(this.props.description,this.props.time)} alt=""/>
      </div>
    )
    }
    if(this.props.size === "small"){
      return(
        <div>
          <img className="weekDayIcon" src={this.getIcon(this.props.description,this.props.time)} alt=""/>
        </div>
      )
    } else {
      return null;
    }
  }
}
export default Icon
