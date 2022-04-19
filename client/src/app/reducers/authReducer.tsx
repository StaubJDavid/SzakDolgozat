/* eslint-disable import/no-anonymous-default-export */

import { SET_CURRENT_USER, SET_USER_MIDDLEWARE } from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action:any){
    //Megnézzük a beérkező akció típusát
    switch(action.type){
        //Attól függően hogy mi az akció típusa megváltoztatjuk a reducer állapotát
        case SET_CURRENT_USER: return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }

        case SET_USER_MIDDLEWARE: return {
            //Mivel redux nem engedi az állapot direkt változtatását
            //ezért a mostani állapotról készítünk egy másolatot
            //azt a másolatot változtatjuk meg
            //és ezzel cseréljük le az egész állapotot
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }

        default: return state;
    }
}