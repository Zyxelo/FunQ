import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import callApi from '../../api';
import './MyQueuesPage.css';

class MyQueuesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myQueues: [],
    };

    this.deleteQueueItem = this.deleteQueueItem.bind(this);
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');

    callApi('queues?user='+userID, 'get')
      .then( (res) => {
        this.setState({myQueues: res.data});
      })
      .catch((err) => {
        console.log(err);
      });

  }

  deleteQueueItem(event, id, listItem, title) {

    if (confirm('Do you really want to delete the queue "'+title+'"')) {
      callApi('queues/'+id,'delete','',true)
        .then( (res) => {
          this.setState((prevState) => {
            let queueList = prevState.myQueues;
            delete queueList[listItem];
            return {myQueues: queueList};
          });
        })
        .catch( (err) => {
          console.log(err);
        });
    }
  }

  render() {
    return(
      <div className="container wrapper">
        <Link to="/create">Create new queue</Link>
        <h3>Your queues</h3>
        <table className="my-queues">
          <tbody>
          <tr>
            <th>Link to queue</th>
            <th>Queue pin</th>
            <th>Update queue</th>
            <th>Remove queue</th>
          </tr>
          {Object.keys(this.state.myQueues).map((item, i) => {
            return <tr key={i}>
              <td><Link to={'/queues/'+this.state.myQueues[item]._id} >{this.state.myQueues[item].queueTitle}</Link></td>
              <td>{this.state.myQueues[item]._id}</td>
              <td><Link className="btn btn-default" role="button" to={'/update/'+this.state.myQueues[item]._id} ><span className="glyphicon glyphicon-edit" aria-hidden="true" /></Link></td>
              <td><Button onClick={(event) => this.deleteQueueItem(event,this.state.myQueues[item]._id,item, this.state.myQueues[item].queueTitle)}><span className="glyphicon glyphicon-remove" aria-hidden="true" /></Button></td>
            </tr>
          })}
          </tbody>
        </table>
        <h3>Current queues</h3>
        <table className="current-queues">
          <tbody>
          <tr>
            <th>Link to queue</th>
            <th>Time left</th>
            <th>Position</th>
          </tr>
          </tbody>
        </table>
      </div>
    );
  };
}

export default connect()(MyQueuesPage);