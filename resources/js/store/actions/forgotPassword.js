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


export const forgotPassword = (email, password = null, token = null) => {
    return dispatch => {
        dispatch(forgotStart());
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("token", token);
        console.log('The value of password is:' + password);
        if(password != null){
                axios
            .post("/api/password/reset", formData)
            .then(response => {
            return response;
            })
            .then(json => {
                console.log(json.data);
            })
            .catch(error => {
                console.log(error);
                dispatch(forgotFail(error));
            });
        }
        else{
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
        }
    };
};