import { type } from "os";
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    auth: false
}

const reducer = (state = initialState, action) => {
    if(action.type == actionTypes.AUTHENTICATION) {
        return {
            ...state,
            auth: !state.auth //changed only the auth prop
        };
    }
    return state;
};

export default reducer;