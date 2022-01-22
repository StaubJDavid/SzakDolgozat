import axios from 'axios';
import {GET_PROFILE,
        PROFILE_LOADING,
        GET_ERRORS,
        CLEAR_PROFILE,
        SEARCH_FOR_MANGA,
        DELETE_MANGA_PROFILE,
        ADD_MANGA_PROFILE
} from './types';

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

export const getProfileNoLoading = (id:number) => (dispatch:any) => {
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

export const searchForManga = (manga:string) => (dispatch:any) => {
    axios.get('https://api.mangadex.org/manga',{params:{title: manga, limit:20}})
    .then(
        res => dispatch({
            type: SEARCH_FOR_MANGA,
            payload: res.data
        })
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const addMangaProfile = (id:number,detail_type:number,manga_id:string,manga_name:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/details`,{
        dt_id: detail_type,
        value: manga_id + " " + manga_name
    })
    .then(
        res => {
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const deleteMangaProfile = (id:number,ud_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/details/${ud_id}`)
    .then(
        res => {
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const updateProfile = (id:number,ud_id:number,value:string) => (dispatch:any) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/user/details/${ud_id}`,{value: value})
    .then(
        res => {
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
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