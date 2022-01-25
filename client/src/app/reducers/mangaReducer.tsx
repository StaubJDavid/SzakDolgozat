/* eslint-disable import/no-anonymous-default-export */
import {
        SEARCH_FOR_MANGA,
        CLEAR_MANGA
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    manga_search: {}
}

export default function(state = initialState, action:any){
    switch(action.type){

        case SEARCH_FOR_MANGA: return {
            ...state,
            manga_search: action.payload
        };
        case CLEAR_MANGA: return {
            ...state,
            manga_search: {}
        };
        default: return state;
    }
}