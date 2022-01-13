import React, { Component } from 'react'
import {connect} from 'react-redux';

type Props = {
    auth:any,
    history:any
}

type State = {
    user:any
}


class Profile extends Component<Props,State> {
    constructor(props:any){
        super(props);
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    render() {
        console.log(this.props.auth)
        return (
            <div>
                Profile Xd
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps,{})(Profile);