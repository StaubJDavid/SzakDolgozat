import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriendRequests, acceptFriendRequest, deleteFriendRequest} from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import classnames from 'classnames';
import SimpleButton from '../../common/SimpleButton';
import NameButton from '../../common/NameButton';
import FriendRequestButton from '../../common/FriendRequestButton';

type Props = {
    auth:any,
    history:any,
    errors:any,
    profile:any,
    f_r:any,
    getFriendRequests:any,
    acceptFriendRequest:any,
    deleteFriendRequest:any
}

type State = {
    error: any,
    acceptHover: boolean,
    deleteHover: boolean,
    refuseHover: boolean
}


class FriendRequests extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            error: {},
            acceptHover:false,
            deleteHover:false,
            refuseHover:false
        }
        
        this.onAcceptFRClick = this.onAcceptFRClick.bind(this);
        this.onDeleteFRClick = this.onDeleteFRClick.bind(this);
    }

    componentDidMount(){
        const {owned} = this.props.profile.profile;

        //console.log("Oned????")
        //console.log(owned);

        if(owned){
            this.props.getFriendRequests()
        }
    }

    onAcceptFRClick(e:any){
        this.props.acceptFriendRequest(
            this.props.profile.profile.id,
            Number(e)
        );
    }

    onDeleteFRClick(e:any){
        //Decline friend request === delete friend request
        this.props.deleteFriendRequest(Number(e));
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
                        <button className="btn-black"
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
                        {/*Recieved Friend Requests*/}
                        <div className="row rounded mb-4">
                            <div className='rounded mb-2 bg-own-dark align-middle' 
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseRecieved"
                                aria-expanded="false"
                                aria-controls="collapseRecieved"><h4 className='text-light text-center m-1 pointer-style'>Recieved friend requests <span className="badge bg-primary">{recieved.length}</span></h4>
                            </div>
                            <hr />
                            <div className="collapse" id="collapseRecieved">
                                {recieved.map((element:any, i:number) => {
                                    return  (<><div className="row mb-2 bg-black gx-4 p-2 rounded" key={`recieved${i}`}>
                                                    <div className="col-md-4 rounded pr-2">
                                                        <NameButton nickname={element.nickname} onClick={() => this.props.history.push('/profile/'+ element.sender_id)} />

                                                        <div className="row mt-2">
                                                            <FriendRequestButton onClick={() => this.onAcceptFRClick(element.sender_id)} icon={"fa-2 bi bi-plus"} bgColor={"bg-green"} bgHoverColor={"bg-green-dark"} />
                                                            <FriendRequestButton onClick={() => this.onDeleteFRClick(element.sender_id)} icon={"fa-2 bi bi-trash-fill"} bgColor={"bg-red"} bgHoverColor={"bg-red-dark"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <textarea rows={4} disabled={true} className="form-control flex-grow-1">{element.message}</textarea>
                                                    </div>
                                            </div>
                                            <hr />
                                            </>
                                    )
                                })}
                            </div>
                        </div>
                        
                        
                        {/*Sent Friend Requests*/}
                        <div className="row rounded">
                            <div className='rounded mb-2 bg-own-dark align-middle'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSent"
                                aria-expanded="false"
                                aria-controls="collapseSent"><h4 className='text-light text-center m-1 pointer-style'>Sent friend requests <span className="badge bg-primary">{sent.length}</span></h4>
                            </div>
                            <div className="collapse" id="collapseSent">
                                <ul className="list-group list-group-flush">
                                {sent.map((element:any, i:number) => {
                                    return  (<>
                                            <div className="row mb-2 bg-black gx-4 p-2 rounded" key={`seny${i}`}>
                                                    <div className="col-md-4 rounded pr-2">
                                                        <NameButton nickname={element.nickname} onClick={() => this.props.history.push('/profile/'+ element.reciever_id)} />

                                                        <div className="row mt-2">
                                                            <FriendRequestButton onClick={() => this.onDeleteFRClick(element.reciever_id)} icon={"fa-2 bi bi-trash-fill"} bgColor={"bg-red"} bgHoverColor={"bg-red-dark"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <textarea rows={4} disabled={true} className="form-control flex-grow-1">{element.message}</textarea>
                                                    </div>
                                            </div>
                                            <hr />
                                            </>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
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