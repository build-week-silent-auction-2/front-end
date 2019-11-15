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
                error: action.payload
            }
        default: 
            return state;
    }
}