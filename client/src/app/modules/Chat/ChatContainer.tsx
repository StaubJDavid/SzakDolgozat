import React, {FC,useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../helpers/isEmpty';
import ChatInput from './ChatInput';
import OutgoingMessage from './OutgoingMessage';
import InboundMessage from './InboundMessage';
import axios from 'axios';
import {addNewConversation,postMessage,addMessageToConversation} from '../../actions/chatActions';
import './ChatStyle.css';

type Props = {
    chat:any,
    currentChat:any,
    addNewConversation:any,
    postMessage:any,
    addMessageToConversation:any
};

const ChatContainer: FC<Props> = ({currentChat,chat,addNewConversation,postMessage,addMessageToConversation}) => {    
    const messageRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        //current, reciever
        if(!isEmpty(currentChat)){
            if(currentChat.friend_id !== undefined) addNewConversation(currentChat.friend_id,currentChat.user_id);
        }
    },[currentChat])

    const handleSendMsg = async (msg:any) => {  
        try {        
            const sentMessage = await postMessage(msg, currentChat.friend_id);
            //console.log("SENT MESSAGE:, ", sentMessage);
            chat.socket.current.emit("send-msg",sentMessage);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        chat.socket.current.on("msg-recieve",(msg:any) => {
            //console.log("RECIEVED MESSAGE: ", msg);
            
            console.log("recieved in component");
        });
    },[])

    useEffect(() => {
        messageRef?.current?.scrollIntoView();
    },[chat.loadedConversations[currentChat.user_id+"_"+currentChat.friend_id]])

    return (
        <>
        <div className="msg_history">
            {chat.loadedConversations.hasOwnProperty(currentChat.user_id+"_"+currentChat.friend_id)?[...chat.loadedConversations[currentChat.user_id+"_"+currentChat.friend_id].messages].reverse().map((msg:any, index:any) => {
                //console.log(msg)
                //let senderName = "";
                if(msg.sender_id === currentChat.user_id){
                    //senderName = "You: ";
                    return (<OutgoingMessage message={msg} />)
                }else{
                    //senderName = `${currentChat.friend_name}: `
                    return (<InboundMessage message={msg} />)
                }
                /*return (
                <div>{senderName}{msg.message}</div>
                );*/
            }):<></>}
            <div ref={messageRef} key={"messageScrollRef"} />
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
    </>
    )
};

const mapStateToProps = (state:any)=>({
    chat: state.chat
});

export default connect(mapStateToProps, {addNewConversation,postMessage,addMessageToConversation})(ChatContainer);