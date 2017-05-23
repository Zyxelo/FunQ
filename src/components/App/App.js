import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Routes from '../Routes/routes';
import { switchModal, setTime, setCancelTime, MODAL_QUEUE_PIN, MODAL_CAPTCHA } from '../../actions';
import io from 'socket.io-client';
import callApi from '../../api';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      shouldPrompt: false
    };
  }

  componentWillMount() {
    if(window.sessionStorage.getItem('visitedBefore') !== 'true') {
      this.props.dispatch(switchModal(MODAL_QUEUE_PIN));
      window.sessionStorage.setItem('visitedBefore', true);
    }
    // TODO This should be a get request to the server
    let lastCaptcha = new Date().getTime() - 25*1000*60;
    if (this.props.isAuthenticated) {
      console.log('nu hämtar vi');
      callApi('user/nextCaptcha', 'get', '', true)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
      console.log(new Date().getTime() - lastCaptcha)

      this.props.dispatch(setCancelTime(new Date().getTime() - lastCaptcha));
    } else {
      console.log('Not logged in - no next captcha');
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
    this.prompter = setInterval(() => this.promptTick(), 5000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.prompter);
  }

  promptTick() {
    if (this.state.shouldPrompt) {
      //(!this.props.modalDisplay) ? this.props.dispatch(switchModal(MODAL_CAPTCHA)): null;
    }
  }

  tick() {
    let time = new Date().getTime();
    this.props.dispatch(setTime(time));

    if ((this.props.cancelTime - time) < 5*1000*60) {
      if (!this.state.shouldPrompt) {
        this.setState({shouldPrompt:true});
        this.props.dispatch(switchModal(MODAL_CAPTCHA));
      }
    }
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
  modalDisplay: PropTypes.bool,
  cancelTime: PropTypes.number
}

// These props come from the application's
// state when it is started
// På svenska: den tar state från store och matar in som props till sin component
function mapStateToProps(state) {
  // 'quotes' not needed, taken from tutorial at https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
  const {auth, modal, timeReducer, cancelTimeReducer} = state
  const {isAuthenticated, errorMessage} = auth
  const {modalType, modalDisplay} = modal
  const {currentTime} = timeReducer
  const {cancelTime} = cancelTimeReducer

  return {
    isAuthenticated,
    errorMessage,
    modalType, modalDisplay,
    currentTime, cancelTime
  }
}

export default connect(mapStateToProps)(App);
