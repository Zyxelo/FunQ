import React, {Component} from 'react';
import { Modal, } from 'react-bootstrap';
import './QueuePinModal.css';

class QueuePin extends Component {
    render () {
        return (
            <div>
                <Modal.Body className="pin-modal">
                    <h1>HAVE A QUEUE CODE?</h1>

                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="QUE PIN" maxLength={20} className="pin-input"></input>
                        </div>
                        <div className="form-group">
                            <button>ENTER QUEUE</button>
                        </div>
                    </form>
                    <p className="close-modal">No pin? <a href="#" onClick={this.props.close}>Enter site</a></p>
                </Modal.Body>
            </div>
        );
    }

}
export default QueuePin;