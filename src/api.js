import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

// Function for handling all api requests to the server
export default (endpoint, req, data, authenticate) => {

  // Remove the slash if entered in the endpoint string
  if (endpoint.substr(0,1) === '/') {
    endpoint = endpoint.substr(1);
  }

  let header = {};

  // If request should be autenticated, add the token
  if(authenticate) {

    // Get the token from local storage
    let token = localStorage.getItem('token') || null;

    // Check if there is a token
    if(token) {
      // Set the token in the header
      header = {Authorization: 'JWT '+token};
    }
    // If not, send an error
    else return new Promise((resolve,reject) => {
      reject(Error('Token not valid!'));
    })
  }

  // Only allow post, get, put and delete requests
  if (!(req === 'post' || req === 'get' || req === 'put' || req === 'delete')) {
    return new Promise((resolve,reject) => {
      reject(Error('Not a valid API request!'));
    });
  }

  // Use axios to make the request to the api
  return axios({
    method: req,
    url: BASE_URL + endpoint,
    data: data,
    headers: header
  })

}