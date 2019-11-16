import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'https://protected-brushlands-21901.herokuapp.com/api',
        headers: {
            authorization: getToken()
        }
    })
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export default api;