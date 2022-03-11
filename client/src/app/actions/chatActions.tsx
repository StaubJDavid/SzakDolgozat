import axios from 'axios';
import {
    GET_ERRORS,
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION
} from './types';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import {io} from 'socket.io-client';

export const connectToServer = (userData:any) => (dispatch:any) => {
    console.log("Connect to chat: ");
    console.log(userData);
    const socket:any = {};
    socket.current = io("http://localhost:3001");
    socket.current.emit("add-user",userData.id);
    console.log(socket.current);
    /*if(socket.current.connected){
        dispatch({
            type: SET_SOCKET,
            payload: socket
        });
    
        dispatch({
            type: SET_CONNECTED,
            payload: true
        });
    }else{
        dispatch({
            type: SET_SOCKET,
            payload: {}
        });
    
        dispatch({
            type: SET_CONNECTED,
            payload: false
        });
    }*/
    dispatch({
        type: SET_SOCKET,
        payload: socket
    });

    dispatch({
        type: SET_CONNECTED,
        payload: true
    });
};

