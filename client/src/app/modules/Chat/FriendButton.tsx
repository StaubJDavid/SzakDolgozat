import {FC} from 'react';
import { connect } from 'react-redux';

type Props = {
    friendlist:any,
    changeChat:any,
    friend:any
};

const FriendButton: FC<Props> = ({friend,friendlist,changeChat}) => {

    let message = "";
    const key = friend.user_id + "_" + friend.friend_id;
    if(friendlist.messages.hasOwnProperty(key)){
        if(friendlist.messages[key].direction === "sent"){
            message = `You: ${friendlist.messages[key].message.message}`;
        }else{
            message = `${friend.friend_name}: ${friendlist.messages[key].message.message}`;
        }
    }else{
        message = "No messages yet";
    }

return (
    <div className='mb-4' onClick={() => changeChat(friend)}>
        <div>{friend.friend_name}</div>
        <div>{message}</div>
    </div>
)
};

const mapStateToProps = (state:any)=>({
    friendlist: state.chat.friendlist
});

export default connect(mapStateToProps, {})(FriendButton);