import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_PROFILE} from './types';

export const getProfile = (id:number) => (dispatch:any) => {
    dispatch(setProfileLoading());
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
    .then(
        res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(
        err => dispatch({
            type: GET_PROFILE,
            payload: null
        })
    );
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

/*export const registerUser = (userData:any, history:any) => (dispatch:any) => {
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
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setCurrentUser = (decoded:any) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => (dispatch:any) => {
    localStorage.removeItem('JWT');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}*/