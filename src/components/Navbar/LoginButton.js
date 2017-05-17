/**
 * Created by antonlindell on 2017-05-17.
 */

import React, { Component, PropTypes } from 'react';
import auth from '../../auth';


export default class LoginButton extends Component {


  render() {
    const { onButtonClick } = this.props

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