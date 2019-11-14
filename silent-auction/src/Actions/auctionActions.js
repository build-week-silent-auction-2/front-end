import api from '../Utils/api';

export const FETCH_AUCTION_START = "FETCH_AUCTION_START";
export const FETCH_AUCTION_SUCCESS = "FETCH_AUCTION_SUCCESS";
export const FETCH_AUCTION_ERROR = "FETCH_AUCTION_ERROR";

export const DELETE_AUCTION = "DELETE_AUCTION";
export const DELETE_AUCTION_ERROR = "DELETE_AUCTION_ERROR";


export const EDIT_AUCTION = "EDIT_AUCTION";
export const EDIT_AUCTION_ERROR = "DELETE_AUCTION_ERROR";


export const ADD_AUCTION = "ADD_AUCTION";
export const ADD_AUCTION_ERROR = "ADD_AUCTION_ERROR";




export const fetchAuctions = () => dispatch => {
    dispatch({ type: FETCH_AUCTION_START })
    api().get('/auctions')
        .then(res => {
            dispatch({ type: FETCH_AUCTION_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: FETCH_AUCTION_ERROR, payload: err })
        })
};

export const addAuction = (item) => dispatch => {
    api().post('/auctions', item)
        .then(res => {
            dispatch({ type: ADD_AUCTION, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: ADD_AUCTION_ERROR, payload: err })
        })
};

export const editAuction = (id, item) => dispatch => {
    api().put(`/auctions/${id}`, item)
        .then(res => {
            dispatch({ type: EDIT_AUCTION, })
        })
}



