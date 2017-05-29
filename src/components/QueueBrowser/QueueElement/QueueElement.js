import React from 'react';
import {Link} from 'react-router-dom';
import TimeLeft from '../../TimeLeft/TimeLeft';

import './QueueElement.css';

class QueueElement extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="queue-thumbnail">
            <Link to={{pathname: '/queues/'+this.props._id, state: this.props}}>
              <img className="queue-thumbnail-img img-responsive" width="100%" src={this.props.thumbnail} alt="thumbnail"/>
            </Link>
          </div>
          <div className="queue-card-content">
            <Link to={{pathname: '/queues/'+this.props._id, state: this.props}}>
              <h4 className="queue-title">{this.props.queueTitle}</h4>
            </Link>
            <p>{'by ' + this.props.queueCompany}</p>
            <p>{this.props.queueShortDescription}</p>
          </div>
          <div className="queue-card-footer">
            <TimeLeft endTime={this.props.queueEndDate}/>
          </div>
        </div>
      </div>
    );
  }
}

export default QueueElement;