import axios from 'axios';
import {
        GET_ERRORS,
        GET_CREATOR,
        GET_SCANGROUP
} from './types';
import store from '../store';

export const getCreator = (creator_id:string) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/author/${creator_id}`,{params:{
        includes:["manga"]
    }})
    .then(
        res => {
            /*dispatch(setCurrentPage(1));
            res.data.manga_name = manga;
            dispatch({
                type: SEARCH_FOR_MANGA,
                payload: res.data
            })*/
            dispatch({
                type: GET_CREATOR,
                payload: res.data.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}

export const getScangroup = (group_id:string) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/group/${group_id}`,{params:{
        includes:["manga", "leader", "member", "user"]
    }})
    .then(
        res => {
            /*dispatch(setCurrentPage(1));
            res.data.manga_name = manga;
            dispatch({
                type: SEARCH_FOR_MANGA,
                payload: res.data
            })*/
            dispatch({
                type: GET_SCANGROUP,
                payload: res.data.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}