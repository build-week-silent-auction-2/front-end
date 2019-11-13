import * as bidActions from '../Actions/bidActions';

const initialState = {
    auctions: [
        {
            auction_id: '',
        }

    ]
}


export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case bidActions.ADD_BID_START:
            return {
                ...state,
                loading: true
            }
        case bidActions.ADD_BID:
            return {
                currentBid: action.payload.price,
                auction_id: action.payload.id
            }
    }
}

