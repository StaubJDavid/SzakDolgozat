import {FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {subscribeToManga} from '../actions/profileActions'
import {getFriendList} from '../actions/chatActions';
import classnames from 'classnames';
import ISO6391 from 'iso-639-1';
import AddButton from '../common/AddButton';
import Friendlist from './Chat/Friendlist';
import ChatContainer from './Chat/ChatContainer';
import ChatStyleTest from './Chat/ChatStyleTest';
import isEmpty from '../helpers/isEmpty';

import './Chat/ChatStyle.css';

type Props = {
};

const ChatPage: FC<Props> = () => {
    const [currentChat, setCurrentChat] = useState({});

    const handleChatChange = (friend:any) => {
        setCurrentChat(friend);
    }

    return (
        <div className='container mw-100'>
            {/*<ChatStyleTest />*/}
            <div className="ccontainer">
                <div className="messaging">
                    <div className="inbox_msg">
                        {/*Friendlist */}
                        <Friendlist currentChat={currentChat} changeChat={handleChatChange}/>
                        {/*Messages */}
                        <div className="mesgs">
                            {isEmpty(currentChat)?<></>:<ChatContainer currentChat={currentChat}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(ChatPage);

/*return (
    <div className='container p-0 m-0'>
        <div style={{maxWidth:"100%",maxHeight:"100vh",height:"auto"}} className='row'>
            <div className='col-4 overflow-scroll'>
                <Friendlist currentChat={currentChat} changeChat={handleChatChange}/>
            </div>
            <div className='col-8 overflow-scroll'>
                {isEmpty(currentChat)?<></>:<ChatContainer currentChat={currentChat}/>}
            </div>
        </div>
    </div>
)*/