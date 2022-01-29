/* eslint-disable import/no-anonymous-default-export */
import {
        SEARCH_FOR_MANGA,
        CLEAR_MANGA,
        CLEAR_RATING,
        GET_RATING,
        SET_CURRENT_PAGE,
        GET_MANGA,
        GET_CHAPTERS,
        GET_MANGA_IMAGES
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    manga_search: {},
    manga: null,
    chapters:null,
    rating: null,
    reading: null,
    currentPage: 1
}

export default function(state = initialState, action:any){
    switch(action.type){

        case SEARCH_FOR_MANGA: return {
            ...state,
            manga_search: action.payload
        };
        case CLEAR_MANGA: return {
            ...state,
            manga_search: {},
            manga: null,
            chapters: null,
            reading:null
        };
        case GET_CHAPTERS: return {
            ...state,
            chapters: action.payload
        }
        case GET_MANGA_IMAGES: return {
            ...state,
            reading: action.payload
        }
        case GET_MANGA: return {
            ...state,
            manga: action.payload
        }
        case CLEAR_RATING: return {
            ...state,
            rating: null
        };
        case GET_RATING: return {
            ...state,
            rating: action.payload
        };
        case SET_CURRENT_PAGE: return {
            ...state,
            currentPage: action.payload
        };
        default: return state;
    }
}