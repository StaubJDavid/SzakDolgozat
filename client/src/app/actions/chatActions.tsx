import axios from 'axios';
import {
    GET_ERRORS,
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION,
    SET_FRIENDLIST
} from './types';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import {io} from 'socket.io-client';
import isEmpty from "../helpers/isEmpty";
import store from '../store';

export const connectToServer = (userData:any) => (dispatch:any) => {
    console.log("Connect to chat: ");
    console.log(userData);
    if(!isEmpty(userData)){
        const socket:any = {};
        socket.current = io("http://localhost:3001");
        socket.current.emit("add-user",userData.id);
        console.log(socket.current);
        dispatch({
            type: SET_SOCKET,
            payload: socket
        });
    
        dispatch({
            type: SET_CONNECTED,
            payload: true
        });
    }else{
        console.log("LOGOUT DISCONNECT");
        if(store.getState().chat.connected){
            store.getState().chat.socket.current.disconnect();
        };
        dispatch({
            type: SET_SOCKET,
            payload: {}
        });
    
        dispatch({
            type: SET_CONNECTED,
            payload: false
        });
    }
};

export const getFriendList = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/friendlist`
    ).then(
        res => {
            dispatch({
                type: SET_FRIENDLIST,
                payload: res.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

