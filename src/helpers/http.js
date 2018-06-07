import axios from 'axios';

let http = axios.create({
	// baseURL: 'http://localhost:2707',
	baseURL: 'https://mybookingappback.herokuapp.com'
})

http.interceptors.request.use(config => {
  config.headers.token = sessionStorage.getItem('token');
  return config;
});

http.interceptors.response.use(res => {
	console.log("Response Interceptor", res);
	return res;
});

export default http;