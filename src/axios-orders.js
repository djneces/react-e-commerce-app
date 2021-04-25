import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myshopapp-2a9da-default-rtdb.firebaseio.com/',
});

export default instance;
