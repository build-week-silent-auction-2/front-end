import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'https://silent-auction-bw.herokuapp.com/api',
        headers: {
            token: getToken()
        }
    })
};

export const getToken = () => {
    return localStorage.get('token');
};

export default api;