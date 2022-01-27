/* eslint-disable import/no-anonymous-default-export */
import {
    GET_THREADS,
    GET_THREAD,
    CLEAR_THREAD,
    CLEAR_THREADS
} from "../actions/types";
 
const initialState = {
    thread_list: null,
    thread: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case GET_THREADS: return {
            ...state,
            thread_list: action.payload
        };
        case GET_THREAD: return {
            ...state,
            thread: action.payload
        };
        case CLEAR_THREADS: return {
            ...state,
            thread: null
        };
        case CLEAR_THREAD: return {
            ...state,
            thread: null
        };
        default: return state;
    }
}