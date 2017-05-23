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
      queueItems: [],
    };

    this.deleteQueueItem = this.deleteQueueItem.bind(this);
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');

    callApi('queues?user='+userID, 'get')
      .then( (res) => {
        this.setState({queueItems: res.data});
      })
      .catch((err) => {
        console.log(err);
      });

  }

  deleteQueueItem(event, id, listItem) {
    callApi('queues/'+id,'delete','',true)
      .then( (res) => {
        this.setState((prevState) => {
          let queueList = prevState.queueItems;
          delete queueList[listItem];
          return {queueItems: queueList};
        });
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  render() {
    return(
      <div className="container wrapper">
        <Link to="/create">Create new queue</Link>
        <table className="my-queues">
          <tbody>
          <tr>
            <th>Link to queue</th>
            <th>Queue pin</th>
            <th>Remove queue</th>
          </tr>
          {Object.keys(this.state.queueItems).map((item, i) => {
            return <tr key={i}>
              <td><Link to={'/queues/'+this.state.queueItems[item]._id} >{this.state.queueItems[item].queueTitle}</Link></td>
              <td>{this.state.queueItems[item]._id}</td>
              <td><Button onClick={(event) => this.deleteQueueItem(event,this.state.queueItems[item]._id,item)}>Remove</Button></td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    );
  };
}

export default connect()(MyQueuesPage);