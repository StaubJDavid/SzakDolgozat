import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriendRequests, acceptFriendRequest, deleteFriendRequest} from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import classnames from 'classnames';
import SimpleButton from '../../common/SimpleButton';

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
                        {/*Recieved Friend Requests*/}
                        <div className="row border rounded mb-4">
                            <div className='border-bottom rounded mb-2 bg-secondary align-middle' 
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseRecieved"
                                aria-expanded="false"
                                aria-controls="collapseRecieved"><h4 className='text-light text-center m-1'>Recieved friend requests <span className="badge bg-primary">{recieved.length}</span></h4>
                            </div>
                            <hr />
                            <div className="collapse" id="collapseRecieved">
                                {recieved.map((element:any, i:number) => {
                                    return  (<><div className="row mb-2" key={`recieved${i}`}>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="col-md-12 d-flex align-items-center justify-content-center">
                                                            <h4><SimpleButton text={element.nickname} onClick={() => this.props.history.push('/profile/'+ element.sender_id)} /></h4>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-end">
                                                        <div style={{cursor:"pointer"}}
                                                            className={classnames("col-md-6 d-flex align-items-center justify-content-center",{"bg-success":this.state.acceptHover})}
                                                            onClick={this.onAcceptFRClick}
                                                            data-id={element.sender_id}
                                                            onMouseEnter={() => this.setState({acceptHover:true})}
                                                            onMouseLeave={() => this.setState({acceptHover:false})}
                                                        >
                                                            <i  
                                                                className="bi bi-plus"
                                                            />
                                                        </div>
                                                        <div style={{cursor:"pointer"}}
                                                            data-id={element.sender_id}
                                                            className={classnames("col-md-6 d-flex align-items-center justify-content-center",{"bg-danger":this.state.refuseHover})}
                                                            onClick={this.onDeleteFRClick}
                                                            onMouseEnter={() => this.setState({refuseHover:true})}
                                                            onMouseLeave={() => this.setState({refuseHover:false})}
                                                        >
                                                            <i className="bi bi-trash-fill" />
                                                        </div>
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
                        <div className="row border rounded">
                            <div className='border-bottom rounded mb-2 bg-secondary align-middle'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSent"
                                aria-expanded="false"
                                aria-controls="collapseSent"><h4 className='text-light text-center m-1'>Sent friend requests <span className="badge bg-primary">{sent.length}</span></h4>
                            </div>
                            <div className="collapse" id="collapseSent">
                                <ul className="list-group list-group-flush">
                                {sent.map((element:any, i:number) => {
                                    return  (<><div className="row mb-2" key={`sent${i}`}>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="col-md-12 d-flex align-items-center justify-content-center">
                                                            <h4><SimpleButton text={element.nickname} onClick={() => this.props.history.push('/profile/'+ element.reciever_id)} /></h4>
                                                        </div>
                                                    </div>
                                                    <div className="row align-bottom mt-auto mb-0">
                                                        <div style={{cursor:"pointer"}}
                                                            data-id={element.reciever_id}
                                                            className={classnames("col-md-12 d-flex align-items-center justify-content-center",{"bg-danger":this.state.deleteHover})}
                                                            onClick={this.onDeleteFRClick}
                                                            onMouseEnter={() => this.setState({deleteHover:true})}
                                                            onMouseLeave={() => this.setState({deleteHover:false})}
                                                        >
                                                            <i className="bi bi-trash-fill" />
                                                        </div>
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