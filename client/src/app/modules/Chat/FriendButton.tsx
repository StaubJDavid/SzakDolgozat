import {FC, useState} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './ChatStyle.css';
import trimString from '../../helpers/trimString';

type Props = {
    friendlist:any,
    currentChat:any,
    changeChat:any,
    friend:any
};

const FriendButton: FC<Props> = ({currentChat,friend,friendlist,changeChat}) => {
    const [hover, setHover] = useState(false);
    let message = "";
    let timestamp = "";
    const key = friend.user_id + "_" + friend.friend_id;
    const cChatKey = currentChat.user_id + "_" + currentChat.friend_id;
    if(friendlist.messages.hasOwnProperty(key)){
        timestamp = friendlist.messages[key].message.timestamp;
        if(friendlist.messages[key].direction === "sent"){
            message = `You: ${friendlist.messages[key].message.message}`;
        }else{
            message = `${friend.friend_name}: ${friendlist.messages[key].message.message}`;
        }
    }else{
        message = "No messages yet";
        timestamp = "";
    }

return (
    <div className={classnames("chat_list",{"active_chat":key === cChatKey || hover})} onClick={() => changeChat(friend)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <div className="chat_people">
            <div className="chat_ib">
                <h5>{friend.friend_name} <span className="chat_date">{timestamp}</span></h5>
                <p className="text-break">{trimString(message,55)}...</p>
            </div>
        </div>
    </div>
)
};

const mapStateToProps = (state:any)=>({
    friendlist: state.chat.friendlist
});

export default connect(mapStateToProps, {})(FriendButton);