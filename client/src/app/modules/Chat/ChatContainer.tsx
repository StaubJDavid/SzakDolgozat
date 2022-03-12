import {FC,useState, useEffect} from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../helpers/isEmpty';
import ChatInput from './ChatInput';
import axios from 'axios';

type Props = {
    chat:any,
    currentChat:any
};

const ChatContainer: FC<Props> = ({currentChat,chat}) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState({});
    //const scrollRef = useRef();
    //{params:{title: manga, limit:20, offset:offset, includes: ["cover_art"]}}
    useEffect(() => {
        //current, reciever
        if(currentChat){
            /*console.log(JSON.parse(localStorage.getItem("chat-app-user")).id);
            console.log(currentChat.id);*/
            axios.get(`http://localhost:3001/api/chat/messages/${currentChat.friend_id}`)
            .then( res => {setMessages(res.data.data.reverse())})
            .catch( err => console.log(err));
        }
    },[currentChat])

    const handleSendMsg = async (msg:any) => {        
        axios.post('http://localhost:3001/api/chat/send',{message:msg, reciever_id:currentChat.friend_id})
        .then( res => {
            //console.log(res.data)
            chat.socket.current.emit("send-msg",{current:currentChat.user_id, reciever:currentChat.friend_id, message:msg});
            axios.get(`http://localhost:3001/api/chat/messages/${currentChat.friend_id}`)
            .then( res => {setMessages(res.data.data.reverse())})
            .catch( err => console.log(err));
        })
        .catch( err => console.log("Error"))
        //console.log(JSON.parse(localStorage.getItem("chat-app-user")).id);
        
    }

    useEffect(() => {
        if(chat.socket.current){
            chat.socket.current.on("msg-recieve",(msg:any) => {
                console.log(msg);
                setArrivalMessage({message:msg.message,sender_id:msg.current,reciever_id:msg.reciever_id})
            })
        }
    },[]);

    useEffect(()=>{
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage] as any);
    },[arrivalMessage])

    return (
        <div>
            <h1>{currentChat.friend_name}</h1>
            <div key="messages">
                {/*<Messages />*/}
                {messages.map((msg:any, index:any) => {
                    //console.log(msg)
                    return (
                    <div>Sender {msg.sender_id}: {msg.message}</div>
                    );
                })}
            </div>
            <div key="input">
                <ChatInput handleSendMsg={handleSendMsg} />
            </div>
        </div>
    )
};

/*<div ref={scrollRef} key={uuidv4()}>
    {msg.sender === currentChat.id?<div>From({currentChat.username}): {msg.message}</div>:<div>To({currentChat.username}): {msg.message}</div>}
</div>*/

const mapStateToProps = (state:any)=>({
    chat: state.chat
});

export default connect(mapStateToProps, {})(ChatContainer);