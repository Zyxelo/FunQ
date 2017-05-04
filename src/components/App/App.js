import React, { Component } from 'react';

import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import EnterQueuePopup from '../EnterQueuePopup/EnterQueuePopup';


class App extends Component {
  constructor(props) {
    super(props);
    console.log(window.sessionStorage);
    this.state = {
      showModal: (!window.sessionStorage.getItem('visitedBefore')),
      modalType: 'QUEUE_PIN'
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

  render() {
    return (
      <div className="App">
          <Routes displayModal={this.showModal}/>
          {(this.state.showModal) ? <ModalConductor
            currentModal={this.state.modalType}
            close={this.closeModal}
          /> : null}

          <EnterQueuePopup displayModal={this.showModal}/>

      </div>
    );
  }
}

export default App;
