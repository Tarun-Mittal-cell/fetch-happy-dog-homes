import axios from 'axios';

const api = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',
    withCredentials: true, // required to handle the authentication session
});

export default api;
