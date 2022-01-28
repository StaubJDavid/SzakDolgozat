/* eslint-disable import/no-anonymous-default-export */
import {
        SEARCH_FOR_MANGA,
        CLEAR_MANGA,
        CLEAR_RATING,
        GET_RATING
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    manga_search: {},
    rating: null,
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
        case CLEAR_RATING: return {
            ...state,
            rating: null
        };
        case GET_RATING: return {
            ...state,
            rating: action.payload
        };
        default: return state;
    }
}