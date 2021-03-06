import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('Logging the error', error);
    toast.error('An unexpected error occurred.');
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

/**
 * mlab (mongo cloud url)
 * mongosh "mongodb+srv://vidly.4oeo2.mongodb.net/myFirstDatabase" --username vidlyuser
 *
 *
 *   brew services run mongodb-community
 *    mongo
 *  brew services stop mongodb-community
 *
 *
 * node seed.js
 * node index.js
 */
