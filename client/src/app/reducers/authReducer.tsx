/* eslint-disable import/no-anonymous-default-export */
import { SET_CURRENT_USER, SET_USER_MIDDLEWARE } from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_CURRENT_USER: return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }

        case SET_USER_MIDDLEWARE: return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }

        default: return state;
    }
}