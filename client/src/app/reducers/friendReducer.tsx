/* eslint-disable import/no-anonymous-default-export */
import {
    GET_FRIEND_REQUESTS,
    CLEAR_FRIEND_REQUESTS
} from "../actions/types";
 
const initialState = {
    friend_requests: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case GET_FRIEND_REQUESTS: return {
            ...state,
            friend_requests: action.payload
        };
        case CLEAR_FRIEND_REQUESTS: return {
            ...state,
            friend_requests: null
        };
        default: return state;
    }
}