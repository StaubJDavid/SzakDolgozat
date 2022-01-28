import axios from 'axios';
import {GET_COMMENTS,
        CLEAR_COMMENTS,
        GET_ERRORS
} from './types';

import {getThread, getThreads} from './threadActions';


export const getComments = (target_id:string) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${target_id}`)
    .then(
        res => {
            dispatch({
                type: CLEAR_COMMENTS
            })
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            })
        }
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const likeTarget = (target_id:string,like:number,target:string,parent:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/votes/like`,{
        target_id:target_id,
        like:like,
        target:target
    })
    .then(
        res => {
            if(target === "COMMENT"){
                dispatch(getComments(parent));
            }else if(target === "THREAD"){
                dispatch(getThread(parent));
            }else if(target === "THREADS"){
                dispatch(getThreads());
            }
        }
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const postComment = (target_id:string,text:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/comments/${target_id}`,{
        message:text
    })
    .then(
        res => dispatch(getComments(target_id))
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}