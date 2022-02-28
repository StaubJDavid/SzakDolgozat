/* eslint-disable import/no-anonymous-default-export */
import { isAwaitExpression } from "typescript";
import {
    GET_LATEST_UPLOADED_CHAPTERS,
    GET_SEASONAL_LISTS,
    GET_MOST_FOLLOWED_MANGAS,
    CLEAR_MAIN_PAGE,
    CLEAR_SEASONAL,
    SORT_SEASONAL,
    SEASONAL_SORTED,
    SEASONAL_COUNT
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    seasonal_list:[],
    latest_chapters:[],
    most_followed:[],
    seasonal_sorted: 0,
    seasonal_count: 0,
}

export default function(state = initialState, action:any){
    switch(action.type){

        case GET_SEASONAL_LISTS: return {
            ...state,
            seasonal_list: [...state.seasonal_list, action.payload]
        };
        case GET_LATEST_UPLOADED_CHAPTERS: return {
            ...state,
            latest_chapters: action.payload
        };
        case GET_MOST_FOLLOWED_MANGAS: return {
            ...state,
            most_followed: action.payload
        };
        case CLEAR_MAIN_PAGE: return {
            ...state,
            seasonal_list:[],
            latest_chapters:[],
            most_followed:[]
        };
        case CLEAR_SEASONAL: return {
            ...state,
            seasonal_list:[]
        };
        case SORT_SEASONAL: return {
            ...state,
            seasonal_list: action.payload
        }
        case SEASONAL_SORTED: return {
            ...state,
            seasonal_sorted: action.payload
        }
        case SEASONAL_COUNT: return {
            ...state,
            seasonal_count: action.payload
        }
        default: return state;
    }
}