import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import logo from '../QuePage/logo.png';
import {Navbar, FormGroup, FormControl} from 'react-bootstrap';
import './QueNavbar.css';
import {Link} from 'react-router-dom';
import { logoutUser, switchModal, MODAL_SIGN_IN } from '../../actions';
import LoginButton from './LoginButton';


class QueNavbar extends Component {
  render() {
    const { dispatch, isAuthenticated } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home" className="navbar-brand"><img className="navbar-logo" alt="Brand" src={logo} /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          {!isAuthenticated &&
            <LoginButton
              onButtonClick={() => {dispatch(switchModal(MODAL_SIGN_IN))}}
              buttonText="Log in"
            />
          }

          {isAuthenticated &&
            <LoginButton
              onButtonClick={() => dispatch(logoutUser())}
              buttonText="Log out"
            />
          }

          {isAuthenticated &&
          <Link to="/mypage" className="btn btn-default navbar-btn navbar-right">
            My Page
          </Link>
          }

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


function mapStateToProps(state) {
  const {auth} = state
  const {isAuthenticated, errorMessage} = auth

  return {
    isAuthenticated,
    errorMessage,
  }
}

export default connect(mapStateToProps)(QueNavbar);


QueNavbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}