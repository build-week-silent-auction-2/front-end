import * as bidActions from '../Actions/bidActions';
const initialState = {
    currentBid: '',
    bid_id: '',
    error: '',
    loading: false,
}
export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case bidActions.ADD_BID:
            return {
                ...state,
                currentBid: action.payload.currentBid,
                bid_id: action.payload.bid_id
            }
        case bidActions.ADD_BID_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case bidActions.EDIT_BID:
            return {
                ...state,
                currentBid: action.payload
            }
        case bidActions.EDIT_BID_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case bidActions.DELETE_BID:
            return {
                ...state,
                bid_id: '',
                currentBid: '',
            }
        case bidActions.DELETE_BID_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}