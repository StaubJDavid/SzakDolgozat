import {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import {getFriendList,} from '../../actions/chatActions';
import isEmpty from '../../helpers/isEmpty';
import FriendButton from './FriendButton';
import './ChatStyle.css';

type Props = {
    friendlist:any,
    currentChat:any,
    changeChat:any,
    getFriendList:any
};

const Friendlist: FC<Props> = ({currentChat,friendlist,getFriendList,changeChat}) => {

    useEffect(() => {
        getFriendList();
    },[]);

return (
    <div className="inbox_people">
        <div className="headind_srch">
            <div className="recent_heading">
                <h4>Recent</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <input type="text" className="search-bar"  placeholder="Search" />
                    <span className="input-group-addon">
                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                    </span>
                </div>
            </div>
        </div>
        <div className="inbox_chat">
        {!isEmpty(friendlist)?friendlist.friendlist.data.map((f:any) => {
                return (<FriendButton currentChat={currentChat} friend={f} changeChat={changeChat}/>)
            }):<></>}
        </div>
    </div>
)
};

/*
<div className="inbox_people">
    <div className="headind_srch">
        <div className="recent_heading">
            <h4>Recent</h4>
        </div>
        <div className="srch_bar">
            <div className="stylish-input-group">
                <input type="text" className="search-bar"  placeholder="Search" />
                <span className="input-group-addon">
                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                </span>
            </div>
        </div>
    </div>
    <div className="inbox_chat">

    </div>
</div>
*/

const mapStateToProps = (state:any)=>({
    friendlist: state.chat.friendlist
});

export default connect(mapStateToProps, {getFriendList})(Friendlist);