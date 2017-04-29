import React from 'react';
import {Link} from 'react-router-dom';
import clock from '../../../../public/images/white_clock.gif';
import './QueTopElement.css';

class QueTopElement extends React.Component {
    render() {

        var imageStyle = {
            backgroundImage: "url(" + this.props.imageSrc + ")",
        };

        return (
            <div className="que-top-element" style={imageStyle}>
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-0 clock">
                        <img src={clock} alt="clock" />
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-12 time-left">
                        <p>{this.props.hours}h {this.props.minutes}min {this.props.seconds}s</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6 que-details">
                        <p>{this.props.queTitle}</p>
                        <p>{this.props.queDetails}</p>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 que-enter">
                        <Link to={this.props.href} className="btn btn-primary" role="button">Enter queue</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default QueTopElement;