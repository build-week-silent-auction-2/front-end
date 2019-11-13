import api from '../Utils/api';
export const ADD_BID_START = "BID_FETCH_START";
export const ADD_BID = "ADD_BID";
export const ADD_BID_ERROR = "ADD_BID_ERROR";

export const DELETE_BID_START = "DELETE_BID_START";
export const DELETE_BID = "DELETE_BID";
export const DELETE_BID_ERROR = "DELETE_BID_ERROR";

export const EDIT_BID_START = "EDIT_BID_START";
export const EDIT_BID = "EDIT_BID";
export const EDIT_BID_ERROR = "EDIT_BID_ERROR";


export const addBid = (id, price) => dispatch => {
    dispatch({ type: BID_FETCH_START });
    api().post(`/api/bids/${id}`, price)
        .then(res => {
            dispatch({ type: ADD_BID, payload: { price: price.price, id: res.data } })
        })
        .catch(err => {
            dispatch({ type: ADD_BID_ERROR, payload: err })
        })
};

export const deleteBid = (id) => dispatch => {
    dispatch({ type: DELETE_BID_START })
    api().delete(`/api/bids/${id}`) 
        .then(res => {
            dispatch({ type: DELETE_BID, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: DELETE_BID_ERROR, payload: err })
        })
};

export const editBid = (id, price) => dispatch => {
    dispatch({ type: EDIT_BID_START })
    api().put(`/api/bids/${id}`, price)
        .then(res => {
            dispatch({ type: EDIT_BID, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: EDIT_BID_ERROR, payload: err })
        })
};

