import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import callApi from '../../api';

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

  deleteQueueItem(event, queueID, listItem) {
    callApi('queues/'+queueID,'delete')
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
          <ul>
            {Object.keys(this.state.queueItems).map((item, i) => {
              return <li key={i}>
                  <Link to={'/queues/'+this.state.queueItems[item].queueID} >{this.state.queueItems[item].queueTitle}</Link>
                  <Button onClick={(event) => this.deleteQueueItem(event,this.state.queueItems[item].queueID,item)}>remove</Button>
              </li>
            })}
          </ul>
      </div>
    );
  };
}

export default connect()(MyQueuesPage);