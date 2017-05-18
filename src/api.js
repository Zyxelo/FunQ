import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export default (endpoint, config, req, authenticate) => {

  let token = localStorage.getItem('token') || null;

  if(authenticate) {
    if(token) {
      config.headers.Authorization = 'JWT'+token;
    }
    else return new Promise((resolve,reject) => {
      reject(Error('Token not valid!'))
    })
  }

  switch (req) {
    case 'get':
      return axios.get(BASE_URL + endpoint, config);
    case 'post':
      return axios.post(BASE_URL + endpoint, config);
    case 'delete':
      return axios.delete(BASE_URL + endpoint, config);
    case 'update':
      return axios.put(BASE_URL + endpoint, config);
    default:
      return new Promise((resolve,reject) => {
        reject(Error('Not a valid API request!'))
      })
  }
}