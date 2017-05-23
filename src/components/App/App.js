import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import { switchModal, setTime, MODAL_HIDE, MODAL_QUEUE_PIN } from '../../actions';
import io from 'socket.io-client';


class App extends Component {
  componentWillMount() {
    if(window.sessionStorage.getItem('visitedBefore') != 'true') {
      this.props.dispatch(switchModal(MODAL_QUEUE_PIN));
      window.sessionStorage.setItem('visitedBefore', true);
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick() {
    let time = new Date().getTime();
    this.props.dispatch(setTime(time));
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage, modalType, modalDisplay } = this.props; //Redux
    return (
      <div className="App">
        <Routes
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          modalType={modalType}
          modalDisplay={modalDisplay}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  modalType: PropTypes.string,
  modalDisplay: PropTypes.bool
}

// These props come from the application's
// state when it is started
// På svenska: den tar state från store och matar in som props till sin component
function mapStateToProps(state) {
  // 'quotes' not needed, taken from tutorial at https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
  const {auth, modal, timeReducer} = state
  const {isAuthenticated, errorMessage} = auth
  const {modalType, modalDisplay} = modal
  const {currentTime} = timeReducer

  return {
    isAuthenticated,
    errorMessage,
    modalType, modalDisplay,
    currentTime
  }
}

export default connect(mapStateToProps)(App);
