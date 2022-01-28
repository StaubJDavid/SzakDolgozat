import axios from 'axios';
import {GET_THREADS,
        GET_THREAD,
        CLEAR_THREAD,
        CLEAR_THREADS,
        GET_ERRORS
} from './types';

import {getComments} from './commentActions';


export const getThreads = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/threads`)
    .then(
        res => dispatch({
            type: GET_THREADS,
            payload: res.data
        })
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const getThread = (thread_id:string) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/threads/${thread_id}`)
    .then(
        res => {
            dispatch({
                type: GET_THREAD,
                payload: res.data
            });
            dispatch(getComments(thread_id));
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

export const setThread = (thread:any) => (dispatch:any) => {
    dispatch({
        type: GET_THREAD,
        payload: thread
    })
    dispatch(getComments(thread.thread_id));
}

export const createThread = (title:string,text:string,history:any) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/threads`,{
        title:title,
        text:text
    })
    .then(
        res => {
            history.push(`/thread/${res.data.thread_id}`, { thread: res.data});
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