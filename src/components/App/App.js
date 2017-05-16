import React, { Component } from 'react';

import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    console.log(window.sessionStorage);
    this.state = {
      showModal: (!window.sessionStorage.getItem('visitedBefore')),
      modalType: 'QUEUE_PIN',
      loggedIn : true
    };
  }

  closeModal = () => {
    this.setState({showModal: false});
  };

  showModal = (type) => {
    this.setState({showModal: true, modalType: type});
  };

  componentWillMount() {
    window.sessionStorage.setItem('visitedBefore', true);
  }

  componentDidUpdate() {
    if (this.state.loggedIn === true) {
      const socket = io.connect('http://localhost:8080');
    }
  }


  render() {
    return (
      <div className="App">
          <Routes displayModal={this.showModal}/>
          {(this.state.showModal) ? <ModalConductor
            currentModal={this.state.modalType}
            close={this.closeModal}
          /> : null}



      </div>
    );
  }
}

export default App;
