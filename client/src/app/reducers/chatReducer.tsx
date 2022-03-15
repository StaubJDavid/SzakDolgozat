/* eslint-disable import/no-anonymous-default-export */
import {
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION,
    SET_FRIENDLIST,

    SET_TEST,
    ADD_NEW_CONVERSATION,
    ADD_MESSAGE_TO_CONVERSATION,
    UPDATE_LAST_MESSAGE,
    SET_CURRENT_CHAT
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
interface ChatState {
    socket:any,
    connected:any,
    newMessages:any,
    friendlist:any,
    loadedConversations:any,
    currentChat:any,
  }

const initialState:ChatState = {
    socket:{},
    connected:false,
    newMessages:[],
    friendlist:{},
    loadedConversations:{},
    currentChat:{},
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
            newMessages: [...state.newMessages, action.payload]
        };
        case SET_CONVERSATION: return {
            ...state,
            newMessages: action.payload
        };
        case SET_FRIENDLIST: return {
            ...state,
            friendlist: action.payload.friendlist
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

        case UPDATE_LAST_MESSAGE: return {
            ...state,
            friendlist:{
                ...state.friendlist,
                data: action.payload
            }
        };

        case SET_CURRENT_CHAT: return {
            ...state,
            currentChat: action.payload
        };
        default: return state;
    }
}