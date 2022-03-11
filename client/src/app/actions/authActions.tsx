import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER, LOGOUT_MIDDLEWARE, SET_USER_MIDDLEWARE} from './types';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import {connectToServer} from './chatActions';
import isEmpty from "../helpers/isEmpty";

export const registerUser = (userData:any, history:any) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, 
        {nickname: userData.nickname,
        email: userData.email,
        password: userData.password,
        password2: userData.password2}
    ).then(
        res => history.push('/login')
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const loginUser = (userData:any) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, 
        {email: userData.email,
        password: userData.password}
    ).then(
        res => {
            const jwt = res.data.token;
            localStorage.setItem('JWT',jwt);
            setAuthToken(jwt);
            const decoded = jwt_decode(jwt);
            dispatch(setCurrentUser(decoded));
            //dispatch(connectToServer(decoded));
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setCurrentUser = (decoded:any) => (dispatch:any) => {
    //if(!isEmpty(decoded)) dispatch(connectToServer(decoded));
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => (dispatch:any) => {
    localStorage.removeItem('JWT');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}


export const setCurrentUserMiddleware = (decoded:any) => {
    return {
        type: SET_USER_MIDDLEWARE,
        payload: decoded
    }
}

export const logoutUserMiddleware = () => (dispatch:any) => {
    localStorage.removeItem('JWT');
    setAuthToken(false);
    dispatch(setCurrentUserMiddleware({}));
}

