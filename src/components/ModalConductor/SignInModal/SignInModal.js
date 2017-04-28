import React, {Component} from 'react';
import {Button, Modal, } from 'react-bootstrap';

class SignIn extends Component {
    render () {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Sign In Modal</h4>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </div>
        );
    }

}
export default SignIn;