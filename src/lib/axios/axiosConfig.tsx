import axios from 'axios';

const baseURL = 'http://localhost:8081';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true,
});

export const instancePrivate = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    withCredentials: true,
  },
});

// Retrieve the token from session storage and set it in the axios instance if it exists
const currentUser = sessionStorage.getItem('jwt');
const token = currentUser ? JSON.parse(currentUser) : null;
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

export default axiosInstance;
