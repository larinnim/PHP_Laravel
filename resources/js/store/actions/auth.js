import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    console.log(localStorage.getItem('token'));
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        axios
        .post("/api/logged_in", formData)
        .then(response => {
        console.log("Arinaaaaa");
        return response;
        })
        .then(json => {
            const expirationDate = new Date (new Date().getTime() + json.data.expires * 1000);
        if (json.data.success) {
            console.log(json.data);
            localStorage.setItem('token', json.data.user.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', json.data.user.id);
            dispatch(authSuccess(json.data.user.token, json.data.user.id));
            dispatch(checkAuthTimeout(json.data.expires))
        }
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    };
};