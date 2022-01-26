import axios from 'axios';
import {GET_ERRORS,
        GET_FRIEND_REQUESTS
} from './types';
import { getProfileNoLoading } from './profileActions';


export const getFriendRequests = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/get/friend-request`)
    .then(
        res => dispatch({
            type: GET_FRIEND_REQUESTS,
            payload: res.data
        })
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const acceptFriendRequest = (id:number,sender_id:number) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/friend-request/accept`,{
        sender_id:sender_id
    })
    .then(
        res => {
            dispatch(getFriendRequests())
            dispatch(getProfileNoLoading(id))
        }
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const deleteFriendRequest = (other_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/friend-request`,{
        data: {
            other_id: other_id
        }
    })
    .then(
        res => dispatch(getFriendRequests())
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const sendFriendRequest = (reciever_id:number,message:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/friend-request`,{
        reciever_id:reciever_id,
        message:message
    })
    .then(
        res => dispatch(getFriendRequests())
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const deleteFriend = (id:number,friend_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/friend`,{
        data:{
            friend_id:friend_id
        }
    })
    .then(
        res => dispatch(getProfileNoLoading(id))
    ).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}
