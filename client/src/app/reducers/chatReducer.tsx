/* eslint-disable import/no-anonymous-default-export */
import {
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION,
    SET_FRIENDLIST,

    SET_TEST,
    ADD_NEW_CONVERSATION,
    ADD_MESSAGE_TO_CONVERSATION
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
interface ChatState {
    socket:any,
    connected:any,
    ongoingConversations:any,
    friendlist:any,
    loadedConversations:any,
  }

const initialState:ChatState = {
    socket:{},
    connected:false,
    ongoingConversations:[],
    friendlist:{},
    loadedConversations:{},
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
        case SET_FRIENDLIST: return {
            ...state,
            friendlist: action.payload
        };

        case SET_TEST: return {
            ...state,
            testlist: action.payload
        };
        case ADD_NEW_CONVERSATION: return {
            ...state,
            loadedConversations:{
                ...state.loadedConversations,
                [action.id]: action.payload
            }
        };
        case ADD_MESSAGE_TO_CONVERSATION: return {
            ...state,
            loadedConversations:{
                ...state.loadedConversations,
                [action.id]: {
                    ...state.loadedConversations[action.id],
                    messages:[action.payload, ...state.loadedConversations[action.id].messages]
                }
            }
        };
        default: return state;
    }
}