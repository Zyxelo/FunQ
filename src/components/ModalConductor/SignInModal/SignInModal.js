import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import './SignInModal.css';

class SignIn extends Component {
    render () {
        return (
            <div>
                <Modal.Body className="signin-modal">
                    <h1>SIGN IN</h1>

                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="E-mail" maxLength={20} className="signin-input"></input>
                            <input type="password" placeholder="Password" maxLength={20} className="signin-input"></input>
                        </div>
                        <div className="form-group">
                            <button className="signin-button">SIGN IN</button>
                        </div>
                    </form>
                    <p className="close-modal">No account? <a href="#" onClick={this.props.close}>Register here</a></p>
                </Modal.Body>
            </div>
        );
    }

}
export default SignIn;