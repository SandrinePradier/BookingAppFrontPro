import axios from 'axios';

let http = axios.create({
	baseURL: 'http://localhost:2707',
})

http.interceptors.request.use(config => {
  config.headers.token = sessionStorage.getItem('token');
  return config;
});

export default http;