import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import './SignInModal.css';
import api from 'axios';
import auth from '../../../auth';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.userEmail + this.state.userPassword);
    api.post('http://localhost:8080/auth/login', {
      email: this.state.userEmail,
      password: this.state.userPassword,
    })
      .then((response) => {
        console.log(response);
        this.props.close();
        auth.authenticateUser(response.data.token);
        console.log(auth.getToken());
        alert("Welcome " + response.data.user.name);
      })
      .catch((error) => {
        console.log(error);
        console.log(this.state.userEmail + this.state.userPassword);
      });
  }

  render () {
    return (
      <div>
        <Modal.Body className="signin-modal">
          <h1>SIGN IN</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text"
                     name="userEmail"
                     placeholder="E-mail"
                     maxLength={20}
                     className="signin-input"
                     value={this.state.userEmail}
                     onChange={this.handleChange}></input>
              <input type="password"
                     name="userPassword"
                     placeholder="Password"
                     maxLength={20}
                     className="signin-input"
                     value={this.state.userPassword}
                     onChange={this.handleChange}></input>
            </div>
            <div className="form-group">
              <button type="submit" className="signin-button">SIGN IN</button>
            </div>
          </form>
          <p className="close-modal">No account? <a href="#" onClick={this.props.close}>Register here</a></p>
        </Modal.Body>
      </div>
    );
  }

}
export default SignIn;