/**
 * Created by martin on 2017-04-27.
 */
import React from 'react';
import {Link} from 'react-router-dom';

import './QueElement.css';

class QueElement extends React.Component {
    render() {

        var imageStyle = {
            backgroundImage: "url(" + this.props.imageSrc + ")",
        };

        return (
            <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="que-element" style={imageStyle}>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 que-details">
                            <p>{this.props.queTitle}</p>
                            <p>{this.props.queDetails}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 time-left">
                            <p>{this.props.hours}h {this.props.minutes}min {this.props.seconds}s</p>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 que-enter">
                            <Link to={this.props.href} className="btn btn-primary" role="button">Enter queue</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QueElement;