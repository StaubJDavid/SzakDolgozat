import {FC, useState} from 'react';
import { connect } from 'react-redux';
import './ChatStyle.css';
import TextareaAutosize from 'react-textarea-autosize';

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
        <div className="type_msg">
            <div className="input_msg_write">
                {/*<input maxLength={255} onChange={(e) => setMsg(e.target.value)} value={msg} type="text" className="write_msg" placeholder="Type a message" />*/}
                <TextareaAutosize
                    minRows={3}
                    maxRows={3}
                    maxLength={255}
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    placeholder="Type a message"
                    wrap='hard'
                    style={{width:"90%", boxSizing:"border-box", overflowY: "scroll", resize:"none"}}
                />
                <button onClick={() => sendChat()} className="msg_send_btn" type="button"><i className="bi bi-plus-lg" aria-hidden="true"></i></button>
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(ChatInput);