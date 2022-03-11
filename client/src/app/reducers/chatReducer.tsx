/* eslint-disable import/no-anonymous-default-export */
import {
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    socket:{},
    connected:false,
    ongoingConversations:[]
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_SOCKET: return {
            ...state,
            socket: action.payload
        };
        case SET_CONNECTED: return {
            ...state,
            connected: action.payload
        };
        case ADD_CONVERSATION: return {
            ...state,
            ongoingConversations: [...state.ongoingConversations, ...action.payload]
        };
        case SET_CONVERSATION: return {
            ...state,
            ongoingConversations: action.payload
        };
        default: return state;
    }
}