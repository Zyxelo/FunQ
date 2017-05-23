import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import './QueuePinModal.css';
import { Redirect } from 'react-router-dom';
import callApi from '../../../api';

class QueuePin extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      pin: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let pin = this.refs.pin.value.trim();
    if (pin !== '') {
      //Validate pin

      callApi('queues/' + pin, 'get')
        .then((response) => {
          if (response.data._id === pin) {
            this.setState({redirect: true, pin: pin});
            this.props.close();
          }
        })
        .catch((err) => {
          const errorMessage = 'Invalid pin';
          console.log(errorMessage);
        })
    }
  }

  render () {
    if(this.state.redirect) {
      return (
        <Redirect to={'/queues/' + this.state.pin}/>
      )
    }
    return (
      <div>
        <Modal.Body className="pin-modal">
          <h1>HAVE A QUEUE CODE?</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="QUE PIN" maxLength={20} className="pin-input" ref="pin" />
            </div>
            <div className="form-group">
              <button className="pin-button">ENTER QUEUE</button>
            </div>
          </form>
          <p className="close-modal">No pin? <a href="#" onClick={this.props.close}>Enter site</a></p>
        </Modal.Body>
      </div>
    );
  }

}
export default QueuePin;