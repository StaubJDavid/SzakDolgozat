import {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import {getFriendList,} from '../../actions/chatActions';
import isEmpty from '../../helpers/isEmpty';
import FriendButton from './FriendButton';

type Props = {
    friendlist:any,
    changeChat:any,
    getFriendList:any
};

const Friendlist: FC<Props> = ({friendlist,getFriendList,changeChat}) => {

    useEffect(() => {
        getFriendList();
    },[]);

return (
    <>
        FriendList
        {!isEmpty(friendlist)?friendlist.friendlist.data.map((f:any) => {
            return (<FriendButton friend={f} changeChat={changeChat}/>)
        }):<></>}
    </>
)
};

const mapStateToProps = (state:any)=>({
    friendlist: state.chat.friendlist
});

export default connect(mapStateToProps, {getFriendList})(Friendlist);