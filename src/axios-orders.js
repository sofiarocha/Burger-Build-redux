import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-6b824.firebaseio.com/',
});

export default instance;