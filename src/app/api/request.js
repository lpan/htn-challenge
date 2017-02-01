import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

// TODO better error handling
const handleError = (error) => { console.error(error); };

const makeUrl = (url, options = {}) => `${url}?${stringify(options)}`;

export const get = (url, options) => fetch(makeUrl(url, options))
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .catch(handleError);
