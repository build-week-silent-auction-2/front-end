import api from '../Utils/api';
export const ADD_BID = "ADD_BID";
export const ADD_BID_ERROR = "ADD_BID_ERROR";
export const DELETE_BID = "DELETE_BID";
export const DELETE_BID_ERROR = "DELETE_BID_ERROR";
export const EDIT_BID = "EDIT_BID";
export const EDIT_BID_ERROR = "EDIT_BID_ERROR";
export const addBid = (id, price) => dispatch => {
    api().post(`/bids/${id}`, price)
        .then(res => {
            dispatch({ type: ADD_BID, payload: { currentBid: price, bid_id: res.data } })
        })
        .catch(err => {
            dispatch({ type: ADD_BID_ERROR, payload: err })
        })
};
export const deleteBid = (id) => dispatch => {
    api().delete(`/bids/${id}`) 
        .then(res => {
            dispatch({ type: DELETE_BID, payload: "Successfully deleted bid" })
        })
        .catch(err => {
            dispatch({ type: DELETE_BID_ERROR, payload: "Could not delete bid" })
        })
};
export const editBid = (id, price) => dispatch => {
    api().put(`/bids/${id}`, price)
        .then(res => {
            dispatch({ type: EDIT_BID, payload: price })
        })
        .catch(err => {
            dispatch({ type: EDIT_BID_ERROR, payload: err })
        })
};