/* eslint-disable import/no-anonymous-default-export */
import {
    GET_CREATOR,
    GET_SCANGROUP
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    scan_group:{},
    creator:{}
}

export default function(state = initialState, action:any){
    switch(action.type){

        case GET_CREATOR: return {
            ...state,
            creator: action.payload
        };
        case GET_SCANGROUP: return {
            ...state,
            scan_group: action.payload
        };
        default: return state;
    }
}