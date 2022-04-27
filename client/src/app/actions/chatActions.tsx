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
    ADD_MESSAGE_TO_CONVERSATION,
    UPDATE_LAST_MESSAGE,
    SET_CURRENT_CHAT
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
        //"http://localhost:3001"
        //"http://80.98.214.13:3001"
        //${process.env.REACT_APP_API_URL=http://80.98.214.13:3001}
        socket.current = io(`http://localhost:3001`);
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

        socket.current.on("msg-recieve",(msg:any) => {
            //console.log("RECIEVED MESSAGE: ", msg);
            console.log("recieved in chat action");
            dispatch(addMessageToConversation(msg.sender_id,msg.reciever_id,msg));
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
    console.log("GET FRIENDLIST");
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/friendlist`
    ).then(
        res => {
            //console.log(res);
            dispatch({
                type: SET_FRIENDLIST,
                payload: res.data
            })
        }
    ).catch(
        err =>{
            //console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        }
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
            payload: err.data
        })
    );
};

export const addNewConversation = (friend_id:any,user_id:any) => (dispatch:any) => {
    console.log("AddNewConversation");
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${friend_id}`
    ).then(
        res => {
            /*console.log(friend_id);
            console.log(user_id);
            console.log(res.data);*/
            //if(res.data.data.length !== 0) dispatch(updateLastMessage(friend_id, user_id, res.data.data[0]));
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
        err => {
            console.log(err);
            /*dispatch({
                type: GET_ERRORS,
                payload: err.data
            })*/
            console.log("Add conv error");
        }
    );
};

export const addMessageToConversation = (friend_id:any, user_id:any, message:any) => (dispatch:any) => {
    const key = String(user_id) + "_" + String(friend_id);
    //console.log("property: " + key);
    dispatch(addUnreadMessage(message));
    if(store.getState().chat.loadedConversations.hasOwnProperty(key)){
        dispatch({
            type: ADD_MESSAGE_TO_CONVERSATION,
            id: key,
            payload: message
        });
        dispatch(updateLastMessage(friend_id, user_id, message));
    }else{
        //console.log("No property: " + key + " Adding it");
        dispatch(addNewConversation(friend_id,user_id));
        dispatch(updateLastMessage(friend_id, user_id, message));
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
        .catch( err => reject(err.data))
    })  
};

export const updateLastMessage = (friend_id:any, user_id:any, message:any) => (dispatch:any) => {
    let index = store.getState().chat.friendlist.data.findIndex((fr:any) => 
        fr.user_id === user_id && fr.friend_id === friend_id
    )

    if(index !== -1){
        let lastMessage = store.getState().chat.friendlist.data[index];

        lastMessage.message_id = message.message_id;
        lastMessage.message = message.message;
        lastMessage.timestamp = message.timestamp;
        lastMessage.sender_id = message.sender_id

        let dataArray = store.getState().chat.friendlist.data.filter((item:any, aindex:number) => aindex !== index);
        console.log(dataArray);
        console.log(lastMessage);
        dataArray.unshift(lastMessage);
        dispatch({
            type: UPDATE_LAST_MESSAGE,
            payload: dataArray
        })
    }
};

export const setCurrentChat = (chat:any) => (dispatch:any) => {
    let array = store.getState().chat.newMessages.filter((e:any) => 
    !(chat.user_id === e.sender_id && chat.friend_id === e.reciever_id) && 
    !(chat.user_id === e.reciever_id && chat.friend_id === e.sender_id)
    )

    dispatch({
        type: SET_CONVERSATION,
        payload: array
    })

    dispatch({
        type: SET_CURRENT_CHAT,
        payload: chat
    })
};

export const addUnreadMessage = (message:any) => (dispatch:any) => {
    const currentChat = store.getState().chat.currentChat;
    if(
        (currentChat.user_id === message.sender_id && currentChat.friend_id === message.reciever_id) || 
        (currentChat.user_id === message.reciever_id && currentChat.friend_id === message.sender_id)
    ){

    }else{
        dispatch({
            type: ADD_CONVERSATION,
            payload: message
        })
    }
};
