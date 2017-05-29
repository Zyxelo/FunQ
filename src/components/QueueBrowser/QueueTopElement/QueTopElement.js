import React from 'react';
import {Link} from 'react-router-dom';
import './QueTopElement.css';

class QueTopElement extends React.Component {
    render() {

        var imageStyle = {
            backgroundImage: "url(" + this.props.thumbnail + ")",
        };

        return (
            <div className="que-top-element container" style={imageStyle}>
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6 que-details">
                        <p>{this.props.queueTitle}</p>
                        <h6>{'by ' + this.props.queueCompany}</h6>
                        <h4>{this.props.queueShortDescription}</h4>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 que-enter">
                        <Link to={{pathname: '/queues/'+this.props._id, state: this.props}} className="btn btn-primary" role="button">Enter queue</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default QueTopElement;