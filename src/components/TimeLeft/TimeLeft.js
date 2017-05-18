import React from 'react';
import './TimeLeft.css';

export const TimeLeft = ({timeLeft}) => {

  return (
    <div className="countdown row">
      <div className="col-sm-3">
        {timeLeft[0]}
        <span>days</span>
      </div>
      <div className="col-sm-3">
        {timeLeft[1]}
        <span className="col-sm-12">hours</span>
      </div>
      <div className="col-sm-3">
        {timeLeft[2]}
        <span>minutes</span>
      </div>
      <div className="col-sm-3">
        {timeLeft[3]}
        <span>seconds</span>
      </div>
    </div>
  );
};