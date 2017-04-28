import React from 'react';
import hakan from './hakan_ullevi.jpg';
import middag from './middag.jpg';
import sof from './sof.jpg';
import QueElement from './QueElement/QueElement';
import './QueBrowser.css';

class QueBrowser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hoursHH:7,
            hoursCK:4,
            hoursSO:18,
            minutes:42,
            seconds:20,
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    tick() {

        this.setState((prevState, props) => ({
            seconds: prevState.seconds -1
        }));

        if (this.state.seconds == -1) {

            this.setState((prevState, props) => ({
                minutes: prevState.minutes -1,
                seconds: 59
            }));
        }

        console.log('hej');

    }

    render() {
        return (
            <div className="container wrapper">
                <QueElement isTopQue={true} mainClass="top-que" imageSrc={hakan} hours={this.state.hoursHH}
                            minutes={this.state.minutes} seconds={this.state.seconds}
                            queTitle="Håkan Hellström" queDetails="Ullevi 27/6" href=""/>
                <div className="row">
                    <QueElement mainClass="col-sm-12 col-md-6" imageSrc={middag} hours={this.state.hoursCK}
                                minutes={this.state.minutes} seconds={this.state.seconds}
                                queTitle="C-klassittning" queDetails="KK 5/6 18.00" href=""/>
                    <QueElement mainClass="col-sm-12 col-md-6" imageSrc={sof} hours={this.state.hoursSO}
                                minutes={this.state.minutes} seconds={this.state.seconds}
                                queTitle="Studentorkesterfestivalen 2017" queDetails="12/6-14/6" href=""/>
                </div>
            </div>
        );
    }
}

export default QueBrowser;