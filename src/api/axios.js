import axios from 'axios';

export default axios.create({
    withCredentials: true,
    baseURL: 'http://www.mocky.io/v2/'


})