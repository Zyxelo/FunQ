import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import callApi from '../../api';
import {Form, FormGroup, FormControl } from 'react-bootstrap';
import TimeLeft from '../TimeLeft/TimeLeft';
import './MyQueuesPage.css';

class MyQueuesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myQueues: [],
      currentQueues: [],
      position: [],
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');

    //get user data
    //set state and fix update

    callApi('queues?user='+userID, 'get')
      .then( (res) => {
        this.setState({myQueues: res.data});
      })
      .catch((err) => {
        console.log(err);
      });

    callApi('queueList/currentQueues','get','',true)
      .then( (res) => {
        this.setState({currentQueues: res.data});
      })
      .catch( (err) => {
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
              <td><Button onClick={() => this.deleteQueueItem(this.state.myQueues[item]._id,item, this.state.myQueues[item].queueTitle)}><span className="glyphicon glyphicon-remove" aria-hidden="true" /></Button></td>
            </tr>
          })}
          </tbody>
        </table>
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
        <h3>Your profile info</h3>
        <div className="row">
          <Form inline onSubmit={this.formSubmit}>
            <FormGroup controlId="username">
              <FormControl type="text" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange}  value={this.state.password} />
            </FormGroup>
            <FormGroup controlId="name">
              <FormControl type="text" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
            </FormGroup>
            <Button type="submit">Signup</Button>
          </Form>
        </div>
      </div>
    );
  };
}

export default connect()(MyQueuesPage);