import {FC,useState, useEffect} from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../helpers/isEmpty';
import ChatInput from './ChatInput';
import axios from 'axios';
import {addNewConversation,postMessage,addMessageToConversation} from '../../actions/chatActions';

type Props = {
    chat:any,
    currentChat:any,
    addNewConversation:any,
    postMessage:any,
    addMessageToConversation:any
};

const ChatContainer: FC<Props> = ({currentChat,chat,addNewConversation,postMessage,addMessageToConversation}) => {    
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

    return (
        <div>
            <h1>{currentChat.friend_name}</h1>
            <div key="messages">
                {/*<Messages />*/}
                {chat.loadedConversations.hasOwnProperty(currentChat.user_id+"_"+currentChat.friend_id)?[...chat.loadedConversations[currentChat.user_id+"_"+currentChat.friend_id].messages].reverse().map((msg:any, index:any) => {
                    //console.log(msg)
                    let senderName = "";
                    if(msg.sender_id === currentChat.user_id){
                        senderName = "You: ";
                    }else{
                        senderName = `${currentChat.friend_name}: `
                    }
                    return (
                    <div>{senderName}{msg.message}</div>
                    );
                }):<></>}
            </div>
            <div key="input">
                <ChatInput handleSendMsg={handleSendMsg} />
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    chat: state.chat
});

export default connect(mapStateToProps, {addNewConversation,postMessage,addMessageToConversation})(ChatContainer);