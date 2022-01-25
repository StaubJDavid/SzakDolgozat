import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import mangaReducer from './mangaReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    manga: mangaReducer,
});