/**
 * Created by antonlindell on 2017-05-17.
 */

import { combineReducers } from 'redux';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, MODAL_QUEUE_PIN, MODAL_SIGN_IN, MODAL_HIDE
} from './actions';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
                isAuthenticated: localStorage.getItem('token') ? true : false,
                errorMessage: '',
              }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default:
      return state
  }
}

function modal(state = {
                 modalType: '',
                 modalDisplay: false
               }, action) {
  switch (action.type) {
    case MODAL_SIGN_IN:
      return Object.assign({}, state, {
        modalType: MODAL_SIGN_IN,
        modalDisplay: true,
      })
    case MODAL_QUEUE_PIN:
      return Object.assign({}, state, {
        modalType: MODAL_QUEUE_PIN,
        modalDisplay: true
      })
    case MODAL_HIDE:
      return Object.assign({}, state, {
        modalType: '',
        modalDisplay: false
      })
    default:
      return state
  }
}

// The queues reducer
// Gör ingenting i nuläget, bara för att
function queues(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

// We combine the reducers here so that they
// can be left split apart above
const queuesApp = combineReducers({
  auth,
  queues,
  modal
})

export default queuesApp;