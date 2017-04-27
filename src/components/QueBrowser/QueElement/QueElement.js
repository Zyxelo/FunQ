/**
 * Created by martin on 2017-04-27.
 */
import React from 'react';

import clock from './white_clock.gif';

class QueElement extends React.Component {
    render() {
        return (
            <div className={this.props.mainClass}>
                <div className="crop">
                    <img className="image" src={this.props.imageSrc} alt="image" />
                </div>
                <div className="que-info">
                    {this.props.isTopQue ?(
                        <div className="clock">
                            <img src={clock} alt="clock" />
                        </div>
                    ) : ('') }
                    <div className="time-left">
                        <p>{this.props.timeLeft}</p>
                    </div>
                    <div className="que-details">
                        <p>{this.props.queTitle}</p>
                        <p>{this.props.queDetails}</p>
                    </div>
                    <div className="btn btn-primary enter-que" role="button">Enter queue</div>
                </div>
            </div>
        )
    }
}

export default QueElement;