import React from 'react';
import Messages from './Messages/Messages';
import './Chat.css';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: {},
      name: 'testUser',
      message: '',
      messages: [

      ]
    };
  }


  componentWillMount() {
    this.setState({socket: io.connect('http://localhost:8080')});
    this.setState({name: localStorage.getItem('userName')});
  }

  componentWillUnmount() {
    this.state.socket.close();
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.q_id !== this.props.q_id) {
      this.state.socket.emit('room-connect', nextProps.q_id, (response) => {
        console.log(response.messages);

        this.setState({
          messages: [ ...this.state.messages, ...response.messages]
        });
      });
    }
  }

  componentDidMount() {
    console.log(this.props.q_id);
    this._handleMessageEvent();

    if (this.props.q_id) {
      this.state.socket.emit('room-connect', this.props.q_id, (response) => {
        console.log(response.messages);

        this.setState({
          messages: [ ...this.state.messages, ...response.messages]
        });
      });
    }

  }

  componentDidUpdate() {
    this.updateScroll();
  }

  handleChange = (event) => {
    if (this.props.isAuthenticated) {
      this.setState({message: event.target.value});
    } else {
      this.setState({message: 'Please, log in to send message'});
    }

  }




  _sendMessage = () => {

    if (this.props.isAuthenticated) {
      let newMessage = this.state.message;
      this.setState({
        messages: [ ...this.state.messages, {
          sender: this.state.name,
          time:  new Date(),
          text:  newMessage
        }]});


      this.setState({message: ''});
      this.state.socket.emit('chat message', {message: newMessage, q_id: this.props.q_id, sender: this.state.name, time: new Date()});
    }

  };

  _handleMessageEvent() {
    this.state.socket.on('chat message', (inboundMessage) => {
      console.log(inboundMessage);
      this.setState({
        messages: [ ...this.state.messages, {
          sender: inboundMessage.sender,
          time:  inboundMessage.time,
          text:  inboundMessage.message
        }]
      });
    });
  }


  updateScroll = () => {
    var element = document.getElementById('message-list');
    element.scrollTop = element.scrollHeight;
  }




  render() {



    return(
      //


      <div className="panel panel-default">
        <div className="panel-heading">Chat</div>
        <div className="panel-body">
          <div className="message-list" id="message-list">
            {this.state.messages.map((message, i) => <Messages key={i} message={message}/>)}
          </div>
          <div className="panel-footer">
            <div className="input-group">
              <input type="text" id="msg-input" value={this.state.message} onChange={this.handleChange}
                     onKeyDown={(event) => (event.keyCode === 13) ? this._sendMessage() : null } className="form-control"/>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this._sendMessage}>Send</button>
                  </span>
            </div>
          </div>
        </div>
      </div>



    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  const {isAuthenticated, errorMessage} = auth;

  return {
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(Chat);

Chat.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};





