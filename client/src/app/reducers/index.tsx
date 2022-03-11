import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import mangaReducer from './mangaReducer';
import friendReducer from './friendReducer';
import threadReducer from './threadReducer';
import commentReducer from './commentReducer';
import mainPageReducer from './mainPageReducer';
import creatorReducer from './creatorReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    manga: mangaReducer,
    friend_requests: friendReducer,
    thread: threadReducer,
    comments: commentReducer,
    mainPage: mainPageReducer,
    creator: creatorReducer,
    chat: chatReducer
});