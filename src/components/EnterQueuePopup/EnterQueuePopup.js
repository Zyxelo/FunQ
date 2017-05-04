import React from 'react';

import './EnterQueuePopup.css';

export default class EnterQueuePopup extends React.Component {
  render() {
    return (
      <div className="queue-popup" onClick={() => {this.props.displayModal('QUEUE_PIN')}}>
        <h2>
          QUICK ENTRY
        </h2>
      </div>
    );
  }
}