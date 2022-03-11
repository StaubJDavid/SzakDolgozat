import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    SET_USER_MIDDLEWARE,
    CLEAR_PROFILE_MIDDLEWARE,
    SET_CONNECTED,
    SET_SOCKET
} from './actions/types';
import {setCurrentUserMiddleware, logoutUserMiddleware} from './actions/authActions';
import {clearProfileMiddleware} from './actions/profileActions';
import {connectToServer} from './actions/chatActions';
import setAuthToken from './helpers/setAuthToken';
import jwt_decode from 'jwt-decode';

const initialState = {};

const checkTokenValidityMiddleware = (store:any) => (next:any) => (action:any) => {
    if((!(action.type === SET_USER_MIDDLEWARE) && !(action.type === CLEAR_PROFILE_MIDDLEWARE) && localStorage.JWT)){
        const decoded:any = jwt_decode(localStorage.JWT);
        if(!store.getState().auth.isAuthenticated){
            setAuthToken(localStorage.JWT);              
            store.dispatch(setCurrentUserMiddleware(decoded));
        }
        
        const currentTime = Date.now()/1000;
        if(decoded.exp < currentTime){
            store.dispatch(logoutUserMiddleware());
            store.dispatch(clearProfileMiddleware());
        }
    }

    return next(action)
}

const checkChatConnectionMiddleware = (store:any) => (next:any) => (action:any) => {
    
    if(!(action.type === SET_SOCKET) && !(action.type === SET_CONNECTED)){
        if(store.getState().auth.isAuthenticated && !store.getState().chat.connected){           
            store.dispatch(connectToServer(store.getState().auth.user));
        }
    }

    return next(action)
}

const middleware = [thunk,checkTokenValidityMiddleware];

const store = createStore(
        rootReducer, 
        initialState, 
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );

export default store;