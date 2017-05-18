import React from 'react';
import strftime from 'strftime';

class Messages extends React.Component {



  render() {

    return(
    <div className="message-bubble">
      <table>
        <tbody>
          <tr>
            <td>
              <p className="text-muted">{this.props.message.sender}</p>
              <span className="timestamp">{strftime('%H:%M:%S', new Date(this.props.message.time))}</span>
            </td>
            <td>
              <span>{this.props.message.text}</span>
            </td>
          </tr>
        </tbody>

      </table>
    </div>



    );

  }

}


export default Messages;



/*
 <div className="message-bubble">
 <p className="text-muted">Matt Townsen</p>
 <span>Why is yo shit so broke?</span>
 </div>
 <div className="message-bubble">
 <p className="text-muted">Matt Townsen</p>
 <p>It IsNamen't'</p>
 </div>
 <div className="message-bubble">
 <p className="text-muted">Matt Townsen</p>
 <p>Umm yes it is</p>
 </div>
 <div className="message-bubble">
 <p className="text-muted">Matt Townsen</p>
 <p>Test message</p>
 </div>
 */