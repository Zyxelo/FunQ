import React, {Component} from 'react';
import {Button, Modal, } from 'react-bootstrap';
import './QueuePinModal.css';

class QueuePin extends Component {
    render () {
        return (
            <div>
                <Modal.Body className="pin-modal">
                    <h1>HAVE A QUEUE CODE?</h1>

                    <form>
                        <div class="form-group">
                            <input type="text"></input>
                        </div>
                        <div class="form-group">
                            <button>ENTER QUEUE</button>
                        </div>
                    </form>
                    <p class="close-modal">Already have a code? <a href="#" onClick={this.props.close}>Close</a></p>
                </Modal.Body>
            </div>
        );
    }

}
export default QueuePin;