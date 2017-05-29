import React from 'react';
import { connect } from 'react-redux';
import callApi from '../../../api';
import TimeLeft from '../../TimeLeft/TimeLeft';
import {Link} from 'react-router-dom';

class CurrentQueues extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQueues: [],
      position: []
    }
  }

  componentDidMount() {

    callApi('queueList/currentQueues','get','',true)
      .then( (res) => {
        this.setState({currentQueues: res.data});
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  getPosition = (id, index) => {
    const query = 'q_id=' + id;

    callApi('queueList/position?' + query, 'get', '', true)
      .then((response) => {
        this.setState((prevState) => {
          let newPosition = prevState.position;
          newPosition[index] = response.data.position;
          return {position: newPosition};
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  };

  render() {
    return(
      <div className="wrapper">
        <h3>Current queues</h3>
        <table className="current-queues">
          <tbody>
          <tr>
            <th>Link to queue</th>
            <th>Queue pin</th>
            <th>Position</th>
            <th>Time left</th>
          </tr>
          {Object.keys(this.state.currentQueues).map((item, i) => {
            this.getPosition(this.state.currentQueues[item].q_id._id,item);
            return <tr key={i}>
              <td><Link to={'/queues/'+this.state.currentQueues[item].q_id._id}>{this.state.currentQueues[item].q_id.queueTitle}</Link></td>
              <td>{this.state.currentQueues[item].q_id._id}</td>
              <td>{this.state.position[item]}</td>
              <td><TimeLeft endTime={this.state.currentQueues[item].q_id.queueEndDate}/></td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect()(CurrentQueues);