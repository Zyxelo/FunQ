import React from 'react';
import {Link} from 'react-router-dom';

import clock from './white_clock.gif';

class QueTopElement extends React.Component {
    render() {
        return (
            <div className={this.props.mainClass}>
                <div className="crop">
                    <img className="image" src={this.props.imageSrc} alt="image" />
                </div>
                <div className="que-info">
                    <div className="row">
                        <div className="col-md-3 clock">
                            <img src={clock} alt="clock" />
                        </div>
                        <div className="col-md-9 time-left">
                            <p>{this.props.hours}h {this.props.minutes}min {this.props.seconds}s</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 que-details">
                            <p>{this.props.queTitle}</p>
                            <p>{this.props.queDetails}</p>
                        </div>
                        <div className="col-md-6">
                            <Link to={this.props.href} className="btn btn-primary home-enter-que" role="button">Enter queue</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QueTopElement;