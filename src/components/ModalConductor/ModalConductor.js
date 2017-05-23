import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import QueuePinModal from './QueuePinModal/QueuePinModal';
import SignInModal from './SignInModal/SignInModal';
import Switch, {Case, Default} from 'react-switch-case';
import { switchModal, MODAL_HIDE } from '../../actions';

class ModalConductor extends Component {
  close = () => {
    this.props.dispatch(switchModal(MODAL_HIDE));
  }

  render() {
    return (
      <div>
          <Modal show={true} onHide={this.close}>
              <Switch condition={this.props.currentModal} >
                  <Case value="QUEUE_PIN">
                      <QueuePinModal close={this.close}/>
                  </Case>
                  <Case value="SIGN_IN">
                      <SignInModal close={this.close}/>
                  </Case>
                  <Default>
                  </Default>
              </Switch>
          </Modal>
      </div>
    );
  }
}


export default connect()(ModalConductor);

