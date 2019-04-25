import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    message: '',
    variant: '',
    error: null,
};

const forgotStart = ( state, action ) => {
    return updateObject( state, { error: null} );
};

const forgotSuccess = (state, action) => {
    console.log('THE STATE IS'+ state);
    console.log('THE ACTION IS'+ action);

    return updateObject( state, { 
        message: action.message,
        variant: action.variant,
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