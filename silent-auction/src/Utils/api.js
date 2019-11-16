import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'https://rocky-wave-68014.herokuapp.com/api',
        headers: {
            authorization: getToken()
        }
    })
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export default api;