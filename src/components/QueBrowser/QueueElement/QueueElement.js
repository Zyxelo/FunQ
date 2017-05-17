import React from 'react';
import {Link} from 'react-router-dom';
import {TimeLeft} from '../../TimeLeft/TimeLeft';

import './QueueElement.css';

class QueElement extends React.Component {


  getTimeRemaining = (t) => {
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return [days, hours, minutes, seconds];
  }



  render() {


    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="queue-thumbnail">
            <Link to={{pathname: '/queues/'+this.props.queueID, state: this.props}}>
              <img className="queue-thumbnail-img img-responsive" width="100%" src={this.props.thumbnail} alt="thumbnail"/>
            </Link>
          </div>
          <div className="queue-card-content">
            <Link to={'/queue/'+this.props.queueID}>
              <h4 className="queue-title">{this.props.queueTitle}</h4>
            </Link>
            <p>{'by ' + this.props.queueCompany}</p>
            <p>{this.props.queueShortDescription}</p>
          </div>
          <div className="queue-card-footer">
            <TimeLeft timeLeft={this.getTimeRemaining((new Date(this.props.queEndDate).getTime() - this.props.currentTime))} />
          </div>
        </div>
      </div>
    );
  }
}

export default QueElement;