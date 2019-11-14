import * as auctionActions from '../Actions/auctionActions';

const initialState = {
    auctions: [],
    loading: false,
    error: ''
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case auctionActions.FETCH_AUCTION_START:
            return {
                ...state,
                loading: true
            }
        case auctionActions.FETCH_AUCTION_SUCCESS:
            return {
                ...state,
                auctions: action.payload
            }
        case auctionActions.FETCH_AUCTION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}
