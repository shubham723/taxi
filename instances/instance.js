import axios from 'axios';

const instance = axios.create({
    baseURL: 'https:www.taxibazzar.in'
});

export default instance;