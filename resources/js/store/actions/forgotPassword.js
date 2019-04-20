import axios from 'axios';
import * as actionTypes from './actionTypes';

export const forgotStart = () => {
    return {
        type: actionTypes.FORGOT_START
    };
};

export const forgotSuccess = () => {
    return {
        type: actionTypes.FORGOT_SUCCESS,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.FORGOT_FAIL,
        error: error
    };
};


export const forgotPassword = (email) => {
    return dispatch => {
        dispatch(forgotStart());
        const formData = new FormData();
        formData.append("email", email);
        axios
        .post("/api/password/email", formData)
        .then(response => {
        console.log("IN FORGOT PASSWORD");
        return response;
        })
        .then(json => {
            console.log(json.data);
        })
        .catch(error => {
            console.log(error);
            dispatch(forgotFail(error));
        });
    };
};