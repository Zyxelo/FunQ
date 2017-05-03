import React from 'react';
import hakan from '../../../public/images/hakan_ullevi.jpg';
import middag from '../../../public/images/middag.jpg';
import sof from '../../../public/images/sof.jpg';
import QueElement from './QueElement/QueElement';
import QueTopElement from './QueTopElement/QueTopElement';
import ModalConductor from '../ModalConductor/ModalConductor';

class QueBrowser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hoursHH:7,
            hoursCK:4,
            hoursSO:18,
            minutes:42,
            seconds:20,
            showModal:false
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
    }

    componentWillMount() {
        document.title = 'FunQ App | Let Your Participants Queue In A Fun Way';
    }

    render() {
        return (
            <div className="container wrapper">
                <QueTopElement imageSrc={hakan} hours={this.state.hoursHH}
                            minutes={this.state.minutes} seconds={this.state.seconds}
                            queTitle="Håkan Hellström" queDetails="Ullevi 27/6" href="/que"/>
                <div className="que-element-wrapper">
                    <div className="row">
                        <QueElement imageSrc={middag} hours={this.state.hoursCK}
                                    minutes={this.state.minutes} seconds={this.state.seconds}
                                    queTitle="C-klassittning" queDetails="KK 5/6 18.00" href="/que"/>
                        <QueElement imageSrc={sof} hours={this.state.hoursSO}
                                    minutes={this.state.minutes} seconds={this.state.seconds}
                                    queTitle="SOF 2017" queDetails="12/6-14/6" href="/que"/>
                    </div>
                </div>
                <ModalConductor currentModal="QUEUE_PIN"/>
            </div>
        );
    }
}

export default QueBrowser;