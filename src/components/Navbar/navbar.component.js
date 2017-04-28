import React from 'react';
import logo from '../QuePage/logo.png';
import './navbar.component.css';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <header className="funq-navbar">
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/home" className="navbar-brand"><img className="navbar-logo" alt="Brand" src={logo} /></Link>
                            </div>
                            <div className="form-group search-bar">
                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                <input type="text" placeholder="Search" className="form-control" id="search" />
                            </div>
                            <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;