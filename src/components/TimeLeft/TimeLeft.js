import React from 'react';
import './TimeLeft.css';
import { connect } from 'react-redux'

class TimeLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }

  getTimeRemaining = (t) => {
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    this.setState({timer: {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }})
  };

  componentWillReceiveProps() {
    this.getTimeRemaining((new Date(this.props.endTime).getTime() - this.props.currentTime))
  };


  render() {
    return (
      <div className="countdown row">
        <div className="col-sm-3">
          {this.state.timer.days}
          <span>days</span>
        </div>
        <div className="col-sm-3">
          {this.state.timer.hours}
          <span className="col-sm-12">hours</span>
        </div>
        <div className="col-sm-3">
          {this.state.timer.minutes}
          <span>minutes</span>
        </div>
        <div className="col-sm-3">
          {this.state.timer.seconds}
          <span>seconds</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {timeReducer} = state;
  const {currentTime} = timeReducer;

  return {
    currentTime
  }
}
export default connect(mapStateToProps)(TimeLeft);