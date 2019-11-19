import * as userActions from '../Actions/UserAction';

const initialState = {
    user: {},
    loading: false,
    error: '',
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case userActions.FETCH_USER_START:
            return {
                ...state,
                loading: true,
                
                // re-initializing user as an empty object to clean up previous fetches
                user: {}
            }
        case userActions.FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case userActions.FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,

                // re-initializing user as an empty object to clean up previous fetches
                user: {}
            }
        default: 
            return state;
    }
}