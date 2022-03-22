import React, { Component} from 'react';
import {connect} from 'react-redux';
import {sendFriendRequest} from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';

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
            message: ""
        }
        
        this.onSendFRClick = this.onSendFRClick.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
    }


    onSendFRClick(e:any){
        this.props.sendFriendRequest(
            this.props.profile.profile.id,
            this.state.message
        );
        this.setState({message: ""});
    }

    onChangeEdit(e:any){
        this.setState({message: String(e.target.value)} as any);
    }

    render() {
        return (
        <>
            <div>
                <p>
                    <button className="btn-black mt-2"
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
                    <TextArea
                        name="text" 
                        maxlength={255}
                        value={this.state.message}
                        error={this.state.error.thing} 
                        onChange={this.onChangeEdit}  
                        placeholder="Hello the person sending this request didn't want to write their own first message to you, pwease accept UwU!"
                        disabled={false}
                    />
                    <button onClick={this.onSendFRClick}
                        className="btn-black mt-2"
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