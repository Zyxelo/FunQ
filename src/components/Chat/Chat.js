import React from 'react';
import Messages from './Messages/Messages';
import './Chat.css';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        },
        {
          name: 'pusher',
          time: new Date(),
          text: 'Hi there'
        }


      ]
    };
  }




  render() {



    return(
      //


      <div className="panel panel-default">
        <div className="panel-heading">Chat</div>
        <div className="panel-body">
          <div className="message-list">
            {this.state.messages.map((message, i) => <Messages key={i} message={message}/>)}
          </div>
          <div className="panel-footer">
            <div className="input-group">
              <input type="text" className="form-control"/>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Send</button>
                  </span>
            </div>
          </div>
        </div>
      </div>



    );
  }
}

export default Chat;

