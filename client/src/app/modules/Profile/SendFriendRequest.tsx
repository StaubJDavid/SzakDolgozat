import React, { Component} from 'react';
import {connect} from 'react-redux';
import {sendFriendRequest} from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TextInput from '../../common/TextInput';

type Props = {
    auth:any,
    errors:any,
    profile:any,
    sendFriendRequest:any
}

type State = {
    error: any,
    message: string
}


class SendFriendRequest extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            error: {},
            message: "Hello the person sending this request didn't want to write their own first message to you, pwease accept UwU!"
        }
        
        this.onSendFRClick = this.onSendFRClick.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
    }


    onSendFRClick(e:any){
        this.props.sendFriendRequest(
            this.props.profile.profile.id,
            this.state.message
        );
    }

    onChangeEdit(e:any){
        this.setState({message: String(e.target.value)} as any);
    }

    render() {
        return (
        <>
            <div>
                <p>
                    <button className="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSendFriendRequest"
                        aria-expanded="false"
                        aria-controls="collapseSendFriendRequest"
                    >
                        Send Friend Request
                    </button>
                </p>
                <div className="collapse" id="collapseSendFriendRequest">
                    <TextInput
                        name="message" 
                        value={this.state.message}
                        error={this.state.error.thing}
                        type="text"
                        onChange={this.onChangeEdit}  
                        placeholder="Write your first message!"
                    />
                    <button onClick={this.onSendFRClick}
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSendFriendRequest"
                        aria-expanded="false"
                        aria-controls="collapseSendFriendRequest">Send
                    </button>
                </div>
            </div>
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps,{sendFriendRequest})(SendFriendRequest);