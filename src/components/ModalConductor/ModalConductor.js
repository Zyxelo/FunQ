import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import QueuePinModal from './QueuePinModal/QueuePinModal';
import SignInModal from './SignInModal/SignInModal';
import Switch, {Case, Default} from 'react-switch-case';

class ModalConductor extends Component {

  render() {
    return (
      <div>
          <Modal show={true} onHide={this.props.close} >
              <Switch condition={this.props.currentModal} >
                  <Case value="QUEUE_PIN">
                      <QueuePinModal close={this.props.close}/>
                  </Case>
                  <Case value="SIGN_IN">
                      <SignInModal close={this.props.close}/>
                  </Case>
                  <Default>
                  </Default>
              </Switch>
          </Modal>
      </div>
    );
  }
}


export default ModalConductor;

