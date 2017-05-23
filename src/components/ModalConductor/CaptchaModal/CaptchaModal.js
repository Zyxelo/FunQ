import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';
//import './QueuePinModal.css';

class CaptchaModal extends Component {

  verifyCallback = (response) => {
    console.log(response);
  };

  render () {
    return (
      <div>
        <Modal.Body className="captcha-modal">
          <h1>Press to stay in queue</h1>


          <Recaptcha render="explicit"
                     sitekey="6LdOKx8UAAAAAH93hUwxSlTqGF8Ef6a69KMbAdRs"
                     onloadCallback={console.log.bind(this, 'recaptcha loaded')}
                     verifyCallback={this.verifyCallback}
          />


        </Modal.Body>
      </div>
    );
  }

}
export default CaptchaModal;