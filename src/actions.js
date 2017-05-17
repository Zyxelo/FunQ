/**
 * Created by antonlindell on 2017-05-17.
 */
import axios from 'axios';
import auth from './auth';
import { CALL_API } from './middleware/api';

//TODO: Lägg in register action

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

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


// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

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

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios.post('http://localhost:8080/auth/login', config)
      .then((response) => {
        //this.props.close();
        auth.authenticateUser(response.data.token, response.data.user.id);
        const user = response.data;
        console.log('loggar in');
        axios.defaults.headers.common['Authorization'] = 'JWT ' + response.data.token; //vet inte om det fungerar
        dispatch(receiveLogin(user));
      })
      .catch((error) => {
        console.log('kunde inte logga in')
        console.log(error);
        dispatch(loginError(error.message))
      });
      /*.then(response =>
        response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          auth.
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('id_token', user.access_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err));*/
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    auth.deauthenticateUser()
    dispatch(receiveLogout())
  }
}