import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './MyQueuesPage.css';
import UserInfo from './UserInfo/UserInfo';
import MyQueues from './MyQueues/MyQueues';
import CurrentQueues from './CurrentQueues/CurrentQueues';

class MyQueuesPage extends React.Component {

  render() {
    return(
      <div className="container wrapper">
        <Link to="/create">Create new queue</Link>
        <MyQueues/>
        <CurrentQueues/>
        <UserInfo/>
      </div>
    );
  };
}

export default connect()(MyQueuesPage);