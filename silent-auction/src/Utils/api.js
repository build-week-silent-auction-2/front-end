import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'https://silent-auction-2.herokuapp.com/api',
        headers: {
            authorization: getToken()
        }
    })
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export default api;