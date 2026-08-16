import axios from 'axios';
import { server } from '../server.js';

const API = axios.create({
  baseURL: server,
  withCredentials: true,
});

export default API;
