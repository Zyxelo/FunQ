/**
 * Created by antonlindell on 2017-05-17.
 */
import axios from 'axios';
import { CALL_API } from './middleware/api';

//TODO: Lägg in register action

// Login action
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'


function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


//Logout action
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    email: creds.email,
    password: creds.password
  }

  return (dispatch) => {
    return axios.post('http://localhost:8080/auth/login', config)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user.id);

        const user = response.data;
        //axios.defaults.headers.common['Authorization'] = 'JWT ' + response.data.token; //vet inte om det fungerar
        dispatch(receiveLogin(user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginError(error.message))
      });
  }
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    dispatch(receiveLogout());
  }
}

export const MODAL_SIGN_IN = 'SIGN_IN'
export const MODAL_QUEUE_PIN = 'QUEUE_PIN'
export const MODAL_HIDE = 'MODAL_HIDE'

export function switchModal(modal) {
  return {
    type: modal,
    modalType: modal
  }
}

export const SET_TIME = 'SET_TIME'

export function setTime(time) {
  return {
    type: SET_TIME,
    currentTime: time
  }
}
