import React from 'react';
import {Link} from 'react-router-dom';
import {TimeLeft} from '../../TimeLeft/TimeLeft';

import './QueueElement.css';



// thumbnail: '/static/media/middag.4944950f.jpg',
//   queueTitle: 'Studentorkesterfestivalen',
//   queueCompany: 'Lintek',
//   queueEventDate:  '2017-05-292T11:22:22.824Z',
//   queEndDate: '2017-05-28T11:22:22.824Z',
//   location: 'Platå',
//   queueShortDescription: 'SOF kommer till stan de vill du inte missa typ',
//   queueCategory: 'Music',
//   numberOfQueuers: 2000,
//   queueID: 'lkasjssaqdjskkk'

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
            <Link to={'/queue/'+this.props.queueID}>
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