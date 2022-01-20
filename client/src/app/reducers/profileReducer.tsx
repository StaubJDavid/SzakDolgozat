/* eslint-disable import/no-anonymous-default-export */
import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE} from "../actions/types";
import isEmpty from "../helpers/isEmpty";
 
const initialState = {
    profile: null,
    profiles: [],
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
        case CLEAR_PROFILE: return {
            ...state,
            profile: null
        };
        default: return state;
    }
}