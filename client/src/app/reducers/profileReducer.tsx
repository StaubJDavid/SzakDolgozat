/* eslint-disable import/no-anonymous-default-export */
import { bindActionCreators } from "redux";
import {GET_PROFILE,
        PROFILE_LOADING,
        CLEAR_PROFILE,
        SEARCH_FOR_MANGA,
        DELETE_MANGA_PROFILE,
        ADD_MANGA_PROFILE
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    profile: null,
    manga_search: {},
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
        /*case ADD_MANGA_PROFILE: return {
            ...state,
            profile:{
                ...state.profile,
                liked_manga: action.payload.liked_manga,
                disliked_manga: action.payload.disliked_manga
            }
        };*/
        case CLEAR_PROFILE: return {
            ...state,
            profile: null
        };
        default: return state;
    }
}