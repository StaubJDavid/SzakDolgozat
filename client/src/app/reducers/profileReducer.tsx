/* eslint-disable import/no-anonymous-default-export */
import {GET_PROFILE,
        PROFILE_LOADING,
        CLEAR_PROFILE,
        SEARCH_FOR_MANGA,
        
        CREATE_LIST,
        GET_LISTS,
        ADD_LIST_ENTRY,
        DEL_LIST_ENTRY,
        CLEAR_LIST,
        CLEAR_PROFILE_MIDDLEWARE,
        GET_SUBSCRIBED_MANGAS
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    profile: null,
    lists:null,
    subscribed:null,
    loading: false
}

export default function(state = initialState, action:any){
    switch(action.type){
        case PROFILE_LOADING: return {
            ...state,
            loading: true
        };
        case GET_PROFILE: return {
            ...state,
            profile: action.payload,
            loading: false
        };
        case SEARCH_FOR_MANGA: return {
            ...state,
            manga_search: action.payload
        };
        case GET_LISTS: return {
            ...state,
            lists: action.payload
        };
        case CLEAR_LIST: return {
            ...state,
            lists:null
        };
        /*case ADD_MANGA_PROFILE: return {
            ...state,
            profile:{
                ...state.profile,
                liked_manga: action.payload.liked_manga,
                disliked_manga: action.payload.disliked_manga
            }
        };*/
        case GET_SUBSCRIBED_MANGAS: return {
            ...state,
            subscribed: action.payload
        };
        case CLEAR_PROFILE: return {
            ...state,
            profile: null
        };
        case CLEAR_PROFILE_MIDDLEWARE: return {
            ...state,
            profile: null
        };
        default: return state;
    }
}