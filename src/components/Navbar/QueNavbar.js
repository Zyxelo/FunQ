import React from 'react';
import logo from '../QuePage/logo.png';
import {Navbar, FormGroup, FormControl} from 'react-bootstrap';
import './QueNavbar.css';
import {Link} from 'react-router-dom';


class QueNavbar extends React.Component {
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
                <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
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