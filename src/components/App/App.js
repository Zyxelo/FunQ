import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Routes from '../Routes/routes';
import ModalConductor from '../ModalConductor/ModalConductor';
import { switchModal, MODAL_HIDE } from '../../actions';
import auth from '../../auth';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: (!window.sessionStorage.getItem('visitedBefore'))
    };
  }

  closeModal = () => {
    this.props.dispatch(switchModal(MODAL_HIDE));
  };

  showModal = (type) => {
    this.props.dispatch(switchModal(type));
  };

  componentWillMount() {
    window.sessionStorage.setItem('visitedBefore', true);
  }



  render() {
    const { dispatch, isAuthenticated, errorMessage, modalType, modalDisplay } = this.props; //Redux
    return (
      <div className="App">
        <Routes
          displayModal={this.showModal}
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
  const {auth, modal} = state
  const {isAuthenticated, errorMessage} = auth
  const {modalType, modalDisplay} = modal

  return {
    isAuthenticated,
    errorMessage,
    modalType, modalDisplay
  }
}

export default connect(mapStateToProps)(App);
