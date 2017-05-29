import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import callApi from '../../../api';
import { connect } from 'react-redux';

class UserInfo extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      user: {},
      password: '',
      ctrlPassword: ''
    }
  }

  componentDidMount() {

    callApi('user/info', 'get','', true)
      .then( (res) => {
        this.setState({user: res.data});
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  changePassword = (event) => {
    event.preventDefault();
    const data = {password: this.state.password, ctrlPassword: this.state.ctrlPassword};

    callApi('user/changePassword', 'put', data, true)
      .then( (res) => {
        alert('You have changed your password!');
      })
      .catch( (err) => {
        console.log(err);
      });
  };

  render() {
    return(
      <div className="wrapper">
        <h3>Your profile info</h3>
        <div className="row">
          <Form horizontal onSubmit={this.changePassword}>
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel} sm={2}>Email:</Col>
              <Col sm={10}>
                <FormControl.Static>{this.state.user.email}</FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>Name:</Col>
              <Col sm={10}>
                <FormControl.Static>{this.state.user.name}</FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="password">
              <Col componentClass={ControlLabel} sm={2}>Password:</Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange}  value={this.state.password} />
              </Col>
            </FormGroup>
            <FormGroup controlId="ctrlPassword">
              <Col componentClass={ControlLabel} sm={2}>Repeat password:</Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Repeat password" name="ctrlPassword" onChange={this.handleChange}  value={this.state.ctrlPassword} />
              </Col>
            </FormGroup>
            <Button type="submit">Change password</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect()(UserInfo);