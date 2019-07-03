import React from 'react';
import Icon from './Icon';

const TimePoint = ({time, description, temperature}) => {
    return(
      <div className="timePoint">
        <div> {time}</div>
        <Icon description={description} time={time} size="normal" />
        <div> {temperature} </div>
      </div>
    )
}
export default TimePoint
