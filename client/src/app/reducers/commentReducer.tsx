/* eslint-disable import/no-anonymous-default-export */
import {
    GET_COMMENTS,
    CLEAR_COMMENTS
} from "../actions/types";
 
const initialState = {
    comments: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case GET_COMMENTS: return {
            ...state,
            comments: action.payload
        };
        case CLEAR_COMMENTS: return {
            ...state,
            comments: null
        };
        default: return state;
    }
}