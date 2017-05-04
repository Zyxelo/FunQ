import React from 'react';
import logo from '../QuePage/logo.png';
import {Navbar, FormGroup, FormControl} from 'react-bootstrap';
import './QueNavbar.css';
import {Link} from 'react-router-dom';
import auth from '../../auth';


class QueNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: auth.isUserAuthenticated() ? 'Sign Out' : 'Sign In'
    }
  }

  signInSignOut = () => {
    if(auth.isUserAuthenticated()) {
      auth.deauthenticateUser();
      this.setState({buttonText: 'Sign In'});
      alert('You logged out');
    } else {
      this.props.displayModal('SIGN_IN');
      this.setState({buttonText: 'Sign Out'});
    }
  }

  componentWillUpdate() {
    this.state.buttonText = auth.isUserAuthenticated() ? 'Sign out' : 'Sign in';
  }

  render() {
    return (
      <Navbar>
          <Navbar.Header>
              <Navbar.Brand>
                  <Link to="/home" className="navbar-brand"><img className="navbar-logo" alt="Brand" src={logo} /></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
              <button type="button" className="btn btn-default navbar-btn navbar-right" onClick={() => {this.signInSignOut()}}>{this.state.buttonText}</button>
              <Navbar.Form pullRight>
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  <FormGroup>
                      <FormControl type="text" placeholder="Search" />
                  </FormGroup>
              </Navbar.Form>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default QueNavbar;