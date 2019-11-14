import * as bidActions from '../Actions/bidActions';

const initialState = {
    currentBid: '',
    auction_id: '',
    error: '',
    loading: false,
}


export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case bidActions.ADD_BID:
            return {
                currentBid: action.payload.price,
                auction_id: action.payload.id
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

        case bidActions.DELETE_BID:
            return {
                ...state,
                
            }

        default: 
            return state;
    }
}

