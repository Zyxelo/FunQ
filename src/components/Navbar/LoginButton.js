/**
 * Created by antonlindell on 2017-05-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class LoginButton extends Component {


  render() {
    const { onButtonClick } = this.props;

    return (
      <button onClick={() => onButtonClick()} className="btn btn-default navbar-btn navbar-right">
        { this.props.buttonText }
      </button>
    );
  }

}

LoginButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string
}