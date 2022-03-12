import {FC, useState} from 'react';
import { connect } from 'react-redux';

type Props = {
    handleSendMsg:any
};

const ChatInput: FC<Props> = ({handleSendMsg}) => {
    const [msg, setMsg] = useState("");
    const sendChat = () => {
        if(msg.length > 0){
            handleSendMsg(msg)
            setMsg("")
        }
    }
    return (
        <div>
            <input onChange={(e) => setMsg(e.target.value)} value={msg} type="text" placeholder='Message'/><button onClick={() => sendChat()}>Send</button>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(ChatInput);