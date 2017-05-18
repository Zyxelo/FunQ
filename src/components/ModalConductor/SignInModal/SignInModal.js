import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import './SignInModal.css';
import {loginUser, switchModal, MODAL_HIDE} from '../../../actions';

class SignIn extends Component {
  handleClick(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.dispatch(loginUser(creds))
      .then(() => {
        if(this.props.isAuthenticated) {
          this.props.dispatch(switchModal(MODAL_HIDE));
        }
    });

  }

  render () {
    const { errorMessage } = this.props
    return (
      <div>
        <Modal.Body className="signin-modal">
          <h1>SIGN IN</h1>
          <form>
            <div className="form-group">
              <input type="text"
                     ref="email"
                     name="userEmail"
                     placeholder="E-mail"
                     maxLength={40}
                     className="signin-input"/>
              <input type="password"
                     ref="password"
                     name="userPassword"
                     placeholder="Password"
                     maxLength={30}
                     className="signin-input"/>
            </div>
            {errorMessage &&
            <p>{errorMessage}</p>
            }
            <div className="form-group">
              <button onClick={(event) => this.handleClick(event)} className="signin-button">
                SIGN IN
              </button>
            </div>
          </form>
          <p className="close-modal">No account? <a href="/signup" onClick={this.props.close}>Register here</a></p>
        </Modal.Body>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const {auth} = state
  const {isAuthenticated, errorMessage} = auth

  return {
    isAuthenticated,
    errorMessage,
  }
}
export default connect(mapStateToProps)(SignIn);

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  close: PropTypes.func.isRequired
}