import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchModal, MODAL_QUEUE_PIN } from '../../actions';
import './EnterQueuePopup.css';

class EnterQueuePopup extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="queue-popup" onClick={() => dispatch(switchModal(MODAL_QUEUE_PIN))}>
        <h2>
          QUICK ENTRY
        </h2>
      </div>
    );
  }
}

export default connect()(EnterQueuePopup);


EnterQueuePopup.propTypes = {
  dispatch: PropTypes.func.isRequired
}
