import React from 'react';
import logo from './logo.png';
import './Home.css'

class Home extends React.Component {
    componentWillMount() {
        document.title = 'FunQ App | Let Your Participants Queue In A Fun Way';
    }

    render() {
        return (
            <div className="container">
                <div className="top">
                    <button className="btn btn-default login-button">Login</button>
                </div>
                <div className="welcome">
                    <div className="center-wrapper">
                        <div className="logo-wrapper">
                            <img src={logo} className="logo" alt="logo"/>
                        </div>
                        <form>
                            <input type="tel" className="form-control home-input" id="enterSession" placeholder="Que PIN" />
                            <button type="submit" className="btn btn-default home-button">Enter</button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
