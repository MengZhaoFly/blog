import axios from 'axios';


const instance = axios.create({
  baseURL: '/mapi',
});

export default instance;