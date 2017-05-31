import React from 'react';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import callApi from '../../../api';
import {Link} from 'react-router-dom';

class MyQueues extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myQueues: []
    }
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

  deleteQueueItem = (id, listItem, title) => {

    if (confirm('Do you really want to delete the queue "'+title+'"')) {
      callApi('queues/'+id,'delete','',true)
        .then( () => {
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
  };

  render() {
    return(
      <div className="wrapper">
        <h3>Your queues</h3>
        <table className="my-queues">
          <tbody>
          <tr>
            <th>Link to queue</th>
            <th>Queue pin</th>
            <th>Update queue</th>
            <th>Remove queue</th>
          </tr>
          {this.state.myQueues.map((item, i) => {
            return <tr key={i}>
              <td><Link to={'/queues/'+item._id} >{item.queueTitle}</Link></td>
              <td>{item._id}</td>
              <td><Link className="btn btn-default" role="button" to={'/update/'+item._id} ><span className="glyphicon glyphicon-edit" aria-hidden="true" /></Link></td>
              <td><Button onClick={() => this.deleteQueueItem(item._id,i, item.queueTitle)}><span className="glyphicon glyphicon-remove" aria-hidden="true" /></Button></td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect()(MyQueues);