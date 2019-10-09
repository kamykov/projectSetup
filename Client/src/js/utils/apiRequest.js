/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { host } from '../../../../config';

// eslint-disable-next-line no-undef
const apiRequest = axios.create({
  baseURL: `http://${host}/`,
});

export {
  apiRequest,
};
