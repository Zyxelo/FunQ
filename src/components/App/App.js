import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import { switchModal, setTime, MODAL_HIDE, MODAL_QUEUE_PIN, MODAL_CAPTCHA } from '../../actions';
import io from 'socket.io-client';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nextQueuePrompt: new Date().getTime() + 5*1000*60 + 5000,
      shouldPrompt: false
    };
  }

  closeModal = () => {
    this.props.dispatch(switchModal(MODAL_HIDE));
  };

  componentWillMount() {
    if(window.sessionStorage.getItem('visitedBefore') != 'true') {
      this.props.dispatch(switchModal(MODAL_QUEUE_PIN));
      window.sessionStorage.setItem('visitedBefore', true);
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
    this.prompter = setInterval(() => this.promptTick(), 5000);
    console.log(new Date(this.state.nextQueuePrompt));
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.prompter);
  }


  promptTick() {
    if (this.state.shouldPrompt) {
      (!this.props.modalDisplay) ? this.props.dispatch(switchModal(MODAL_CAPTCHA)): null;
    }
  }

  tick() {
    let time = new Date().getTime();
    this.props.dispatch(setTime(time));

    if ((this.state.nextQueuePrompt - time) < 5*1000*60) {
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
        />

        {(modalDisplay) ? <ModalConductor
          currentModal={modalType}
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
