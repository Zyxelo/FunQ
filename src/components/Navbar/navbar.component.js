import React from 'react';
import logo from '../QuePage/logo.png';
import './navbar.component.css';

class Navbar extends React.Component {
    render() {
        return (
            <header className="funq-navbar">
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="">
                                <img className="navbar-logo" alt="Brand" src={logo} />
                            </a>
                            <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;