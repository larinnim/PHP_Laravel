import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
};

const forgotStart = ( state, action ) => {
    return updateObject( state, { error: null} );
};

const forgotSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
     });
};

const forgotFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FORGOT_START: return forgotStart(state, action);
        case actionTypes.FORGOT_SUCCESS: return forgotSuccess(state, action);
        case actionTypes.FORGOT_FAIL: return forgotFail(state, action);
        default:
            return state;
    }
};

export default reducer;