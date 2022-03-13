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
import isEmpty from '../helpers/isEmpty';

type Props = {
};

const ChatPage: FC<Props> = () => {
    const [currentChat, setCurrentChat] = useState({});

    const handleChatChange = (friend:any) => {
        setCurrentChat(friend);
    }

    return (
        <>
        <div>ChatPage</div>
        <div><Friendlist changeChat={handleChatChange}/></div>
        <div>{isEmpty(currentChat)?<></>:<ChatContainer currentChat={currentChat}/>}</div>
        </>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(ChatPage);