import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import QueuePinModal from './QueuePinModal/QueuePinModal';
import SignInModal from './SignInModal/SignInModal';
import Switch, {Case, Default} from 'react-switch-case';

class ModalConductor extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal : true
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    getInitialState() {
        return { showModal: true };
    }

    close() {
        this.setState({ showModal: false });

    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} bsSize="md" onHide={this.close}>
                    <Switch condition={this.props.currentModal} >
                        <Case value="QUEUE_PIN">
                            <QueuePinModal close={this.close}/>
                        </Case>
                        <Case value="SIGN_IN">
                            <SignInModal close={this.close}/>
                        </Case>
                        <Default>
                            //Default?
                        </Default>
                    </Switch>
                </Modal>
            </div>
        );
    }
}


export default ModalConductor;

// switch(this.state.currentModal) {
//     case 'QUEUE_PIN':
//         return <QueuePinModal close={this.close}/>
//     case 'SIGN_IN':
//         return <SignInModal close={this.close}/>
// }

//
// import QueuePinModal from './QueuePinModal/QueuePinModal';
// // import SignInModal from './SignInModal/SignInModal';
//
//
// const ModalConductor = props => {
//     switch (props.currentModal) {
//         case 'QUEUE_PIN':
//             return <QueuePinModal {...props}/>;
//
//         // case 'SOCIAL_SIGN_IN':
//         //     return <SignInModal {...props}/>;
//
//         default:
//             return null;
//     }
// };
//
// export default ModalConductor;