import React, { Component } from 'react';
import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      modalType: 'QUEUE_PIN'
    };
  }

  close = () => {
    this.setState({showModal: false});
  };

  show = (type) => {
    this.setState({showModal: true, modalType: type});
  };

  render() {
    return (
      <div className="App">
          <Routes/>
        {(this.state.showModal) ? <ModalConductor
            currentModal={this.state.modalType}
            close={this.close}
          /> : null}
      </div>
    );
  }
}

export default App;
