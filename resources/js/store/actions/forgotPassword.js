import axios from 'axios';
import * as actionTypes from './actionTypes';

export const forgotStart = () => {
    return {
        type: actionTypes.FORGOT_START
    };
};

export const forgotSuccess = (message, variant) => {
    return {
        type: actionTypes.FORGOT_SUCCESS,
        message: message,
        variant: variant
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
       
        if(password != null){
                axios
            .post("/api/password/reset", formData)
            .then(response => {
  

                // dispatch(forgotSuccess(response.data.error || response.data.success ));

                if(response.data.error){
                    dispatch(forgotSuccess(response.data.error, 'error'));
                }
                if(response.data.success){
                    dispatch(forgotSuccess(response.data.success, 'success'));
                }
                // console.log('MESSSSSS'+response.data.success)
                // dispatch(forgotSuccess(response.data.success));
                return response;
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
                dispatch(forgotSuccess(response.data.success));
                return response;
            })
            .catch(error => {
                console.log(error);
                dispatch(forgotFail(error));
            });
        }
    };
};