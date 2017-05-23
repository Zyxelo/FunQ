import React from 'react';
import Messages from './Messages/Messages';
import './Chat.css';
import io from 'socket.io-client';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: {},
      name: 'testUser',
      messages: [
        {
          sender: 'pusher',
          time: new Date(),
          text: 'Hi there'
        }
      ]
    };
  }


  componentWillMount() {
    this.setState({socket: io.connect('http://localhost:8080')});
  }

  componentWillUnmount() {
    // leave  the room of the socket.
    this.state.socket.close();
  }


  componentDidMount() {
    this._handleMessageEvent();
    this.state.socket.emit('room-connect', this.props.q_id, (response) => {
      console.log(response.messages);

      this.setState({
        messages: [ ...this.state.messages, ...response.messages]
      });
    });
  }

  componentDidUpdate() {
    this.updateScroll();
  }




  _sendMessage = () => {
    let newMessage = document.getElementById('msg-input').value;
    this.setState({
      messages: [ ...this.state.messages, {
        sender: this.state.name,
        time:  new Date(),
        text:  newMessage
      }]});


    document.getElementById('msg-input').value = '';
    this.state.socket.emit('chat message', {message: newMessage, q_id: this.props.q_id, sender: this.state.name, time: new Date()});

  };

  _handleMessageEvent() {
    this.state.socket.on('chat message', (inboundMessage) => {
      console.log(inboundMessage);
      this.setState({
        messages: [ ...this.state.messages, {
          name: inboundMessage.sender,
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
              <input type="text" id="msg-input" className="form-control"/>
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

export default Chat;

