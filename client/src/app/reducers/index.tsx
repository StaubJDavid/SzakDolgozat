import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import mangaReducer from './mangaReducer';
import friendReducer from './friendReducer';
import threadReducer from './threadReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    manga: mangaReducer,
    friend_requests: friendReducer,
    thread: threadReducer,
    comments: commentReducer
});