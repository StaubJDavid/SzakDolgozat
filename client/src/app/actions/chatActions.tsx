import axios from 'axios';
import {
    GET_ERRORS,
    SET_SOCKET,
    SET_CONNECTED,
    ADD_CONVERSATION,
    SET_CONVERSATION,
    SET_FRIENDLIST,

    SET_TEST,
    ADD_TEST,
    ADD_NEW_CONVERSATION,
    ADD_MESSAGE_TO_CONVERSATION
} from './types';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import {io} from 'socket.io-client';
import isEmpty from "../helpers/isEmpty";
import store from '../store';

export const connectToServer = (userData:any) => (dispatch:any) => {
    //console.log("Connect to chat: ");
    //console.log(userData);
    if(!isEmpty(userData)){
        const socket:any = {};
        socket.current = io("http://localhost:3001");
        socket.current.emit("add-user",userData.id);
        //console.log(socket.current);
        dispatch({
            type: SET_SOCKET,
            payload: socket
        });
    
        dispatch({
            type: SET_CONNECTED,
            payload: true
        });
    }else{
        //console.log("LOGOUT DISCONNECT");
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

export const getMessages = (friend_id:any,user_id:any) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${friend_id}`
    ).then(
        res => {
            dispatch({
                type: SET_CONVERSATION,
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

export const getFriendlistTest = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/friendlist`
    ).then(
        res => {
            //console.log(res.data);
            for(let i = 0; i < res.data.friendlist.data.length; i++){
                dispatch({
                    type: ADD_TEST,
                    id: res.data.friendlist.data[i].user_id+"_"+ res.data.friendlist.data[i].friend_id,
                    payload:  res.data.friendlist.data[i]
                })
            }

            for(let i = 0; i < res.data.friendlist.data.length; i++){
                dispatch({
                    type: ADD_TEST,
                    id: res.data.friendlist.data[i].user_id+"_"+ res.data.friendlist.data[i].friend_id,
                    payload:  {...res.data.friendlist.data[i], update:true}
                })
            }
            
        }
    ).catch(
        err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: null
            });
        }
    );
};

export const addNewConversation = (friend_id:any,user_id:any) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${friend_id}`
    ).then(
        res => {
            dispatch({
                type: ADD_NEW_CONVERSATION,
                id:user_id + "_" + friend_id,
                payload: {
                    user_id:user_id,
                    friend_id:friend_id,
                    messages:res.data.data
                }
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addMessageToConversation = (friend_id:any, user_id:any, message:any) => (dispatch:any) => {
    /*console.log("Friend:",friend_id);
    console.log("user_id:",user_id);
    const sen_id = String(user_id);
    const rec_id = String(friend_id);*/
    const key = String(user_id) + "_" + String(friend_id);;
    if(store.getState().chat.loadedConversations.hasOwnProperty(key)){
        dispatch({
            type: ADD_MESSAGE_TO_CONVERSATION,
            id: key,
            payload: message
        })
    }else{
        console.log("No property: " + key);
    }
};

export const postMessage = (msg:any, reciever_id:any) => (dispatch:any) => {
    return new Promise((resolve,reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/chat/send`,{message:msg, reciever_id:reciever_id})
        .then( res => {
            const trueData = res.data;
            //console.log(trueData.data);
            dispatch(addMessageToConversation(reciever_id, trueData.data[0].sender_id, trueData.data[0]))
            resolve(trueData.data[0]);
        })
        .catch( err => reject(err.response.data))
    })  
};