import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import auth from '../../auth';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
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
    const { dispatch, isAuthenticated, errorMessage } = this.props; //Redux
    return (
      <div className="App">
        <Routes displayModal={this.showModal} loggedIn={this.state.loggedIn}
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />


        {(this.state.showModal) ? <ModalConductor
          currentModal={this.state.modalType}
          close={this.closeModal}
        /> : null}

      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

// These props come from the application's
// state when it is started
// På svenska: den tar state från store och matar in som props till sin component
function mapStateToProps(state) {
  // 'quotes' not needed, taken from tutorial at https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
  const {auth} = state
  const {isAuthenticated, errorMessage} = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);
