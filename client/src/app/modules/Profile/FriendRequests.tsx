import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriendRequests, acceptFriendRequest, deleteFriendRequest} from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

type Props = {
    auth:any,
    errors:any,
    profile:any,
    f_r:any,
    getFriendRequests:any,
    acceptFriendRequest:any,
    deleteFriendRequest:any
}

type State = {
    error: any,
}


class FriendRequests extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            error: {},
        }
        
        this.onAcceptFRClick = this.onAcceptFRClick.bind(this);
        this.onDeleteFRClick = this.onDeleteFRClick.bind(this);
    }

    componentDidMount(){
        const {owned} = this.props.profile.profile;

        console.log("Oned????")
        console.log(owned);

        if(owned){
            this.props.getFriendRequests()
        }
    }

    onAcceptFRClick(e:any){
        this.props.acceptFriendRequest(
            this.props.profile.profile.id,
            Number(e.target.getAttribute('data-id'))
        );
    }

    onDeleteFRClick(e:any){
        //Decline friend request === delete friend request
        this.props.deleteFriendRequest(Number(e.target.getAttribute('data-id')));
    }

    render() {
        //console.log(this.props.f_r);
        //const {owned} = this.props.profile.profile;

        let frContent = <></>;

        if (this.props.f_r.friend_requests != null){
            let {sent,recieved} = this.props.f_r.friend_requests;
            frContent = 
            (
                <div>
                    <p>
                        <button className="btn btn-primary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFriendRequests"
                            aria-expanded="false"
                            aria-controls="collapseFriendRequests"
                        >
                            Friend Requests
                        </button>
                    </p>
                    <div className="collapse" id="collapseFriendRequests">
                        <div>Recieved friend requests</div>
                        <ul className="list-group list-group-flush">
                        {recieved.map((element:any, i:number) => {
                            return  <li key={`recieved${i}`} className="list-group-item">
                                        <p>From: <Link to={'/profile/'+ element.sender_id} >{element.nickname}</Link></p>
                                        <p>Message: {element.message}</p>
                                        <i  onClick={this.onAcceptFRClick}
                                            data-id={element.sender_id}
                                            className="bi bi-plus"
                                        />
                                        <i  onClick={this.onDeleteFRClick}
                                            data-id={element.sender_id}
                                            className="bi bi-trash-fill"
                                        />
                                    </li>
                        })}
                        </ul>
    
                        <div>Sent friend requests</div>
                        <ul className="list-group list-group-flush">
                        {sent.map((element:any, i:number) => {
                            return  <li key={`recieved${i}`} className="list-group-item">
                                        <p>To: <Link to={'/profile/'+ element.reciever_id} >{element.nickname}</Link></p>
                                        <p>Message: {element.message}</p>
                                        <i  onClick={this.onDeleteFRClick}
                                            data-id={element.reciever_id}
                                            className="bi bi-trash-fill"
                                        />
                                    </li>
                        })}
                        </ul>
                    </div>
                </div>
            )
        }

        return (
        <>
            {frContent}
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
    f_r: state.friend_requests
});

export default connect(mapStateToProps,{getFriendRequests, acceptFriendRequest, deleteFriendRequest})(FriendRequests);