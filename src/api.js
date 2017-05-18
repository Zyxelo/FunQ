import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export default (endpoint, data, req, authenticate) => {

  let token = localStorage.getItem('token') || null;
  let header = {};

  if(authenticate) {
    if(token) {
      header = {Authorization: 'JWT '+token};
    }
    else return new Promise((resolve,reject) => {
      reject(Error('Token not valid!'))
    })
  }

  if (!(req === 'post' || req === 'get' || req === 'put' || req === 'delete')) {
    return new Promise((resolve,reject) => {
      reject(Error('Not a valid API request!'))
    })
  }

  return axios({
    method: req,
    url: BASE_URL + endpoint,
    data: data,
    headers: header
  })

}