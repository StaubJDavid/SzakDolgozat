/* eslint-disable import/no-anonymous-default-export */
import {
        SEARCH_FOR_MANGA,
        CLEAR_MANGA,
        CLEAR_RATING,
        GET_RATING,
        SET_CURRENT_PAGE,
        GET_MANGA,
        GET_CHAPTERS,
        GET_MANGA_IMAGES,
        GET_READING_CHAPTERS,
        CLEAR_READING_CHAPTERS,
        ADD_READING_CHAPTERS,
        GET_READING_CHAPTER
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    manga_search: {},
    manga: null,
    chapters:null,
    rating: null,
    reading: null,
    reading_chapters: {chapter:{},chapters:[]},
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
        case CLEAR_READING_CHAPTERS: return {
            ...state,
            reading_chapters: {chapter:{},chapters:[]}
        };
        case GET_READING_CHAPTERS: return {
            ...state,
            reading_chapters: {
                ...state.reading_chapters,
                chapters: action.payload
            }
        };
        case ADD_READING_CHAPTERS: return {
            ...state,
            reading_chapters: {
                ...state.reading_chapters,
                chapters: [...state.reading_chapters.chapters,...action.payload]
            }
        };
        case GET_READING_CHAPTER: return {
            ...state,
            reading_chapters: {
                ...state.reading_chapters,
                chapter: action.payload,
                chapters: [...state.reading_chapters.chapters]
            }
        };
        default: return state;
    }
}