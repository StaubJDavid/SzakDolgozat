import {FC, useState} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './ChatStyle.css';
import trimString from '../../helpers/trimString';
import timeFormat from '../../helpers/timeFormat';
import countUnreadMessages from '../../helpers/countUnreadMessages';

type Props = {
    index:number,
    friendlist:any,
    currentChat:any,
    changeChat:any,
    friend:any,
    newMessages:any
};

const FriendButton: FC<Props> = ({index,currentChat,friend,friendlist,changeChat,newMessages}) => {
    const [hover, setHover] = useState(false);
    let message = "";
    let timestamp = "";
    const key = friend.user_id + "_" + friend.friend_id;
    const cChatKey = currentChat.user_id + "_" + currentChat.friend_id;
    /*if(friendlist.messages.hasOwnProperty(key)){
        timestamp = friendlist.messages[key].message.timestamp;
        if(friendlist.messages[key].direction === "sent"){
            message = `You: ${friendlist.messages[key].message.message}`;
        }else{
            message = `${friend.nickname}: ${friendlist.messages[key].message.message}`;
        }
    }else{
        message = "No messages yet";
        timestamp = "";
    }*/
    if(friendlist.data[index].message_id === null){
        message = "No messages yet";
        timestamp = "";
    }else{
        timestamp = friendlist.data[index].timestamp;
        if(friendlist.data[index].sender_id === friend.user_id){
            message = `You: ${friendlist.data[index].message}`;
        }else{
            message = `${friend.nickname}: ${friendlist.data[index].message}`;
        }
    }

    let unreadMessages = countUnreadMessages(friend, newMessages);

return (
    <div className={classnames("chat_list",{"active_chat":key === cChatKey || hover})} onClick={() => changeChat(friend)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <div className="chat_people">
            
            <div className="chat_ib">
                <h5>{friend.nickname} <span className="chat_date">{timeFormat(timestamp)}</span></h5>
                <p className="text-break">{trimString(message,55)}{message.length>55?"...\t":"\t"}{unreadMessages===0?"":<span className="badge rounded-pill bg-danger">{unreadMessages}</span>}</p>
                <p className="text-break"></p>
            </div>
        </div>
    </div>
)
};

const mapStateToProps = (state:any)=>({
    friendlist: state.chat.friendlist,
    currentChat: state.chat.currentChat,
    newMessages: state.chat.newMessages
});

export default connect(mapStateToProps, {})(FriendButton);