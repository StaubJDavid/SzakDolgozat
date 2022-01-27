import React, { Component} from 'react';
import {connect} from 'react-redux';
import {likeTarget} from '../actions/commentActions';
import TextInput from './TextInput';

type Props = {
    errors:any,
    auth:any
    target_id:any,
    like:any,
    likes:any,
    dislikes:any,
    parent:any,
    type:any,
    likeTarget:any
}

type State = {

}


class LikeButtons extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }

        this.onLikeClicked = this.onLikeClicked.bind(this);
    }

    onLikeClicked(e:any){
        if(this.props.auth.isAuthenticated){
            this.props.likeTarget(
                this.props.target_id,
                e.target.getAttribute('data-val'),
                this.props.type,
                this.props.parent
            )
            
        }
    }

    render() {
        let {like,likes,dislikes} = this.props;
        //<i class="bi bi-hand-thumbs-up-fill"></i>
        //<i class="bi bi-hand-thumbs-down-fill"></i>
        let likeButtons = (<>
            <div>
                <i
                data-val={1}
                onClick={this.onLikeClicked}
                className={like===0||like==null?"bi bi-hand-thumbs-up":"bi bi-hand-thumbs-up-fill"}
                ></i>{likes}
            </div>
            <div>
                <i
                data-val={0}
                onClick={this.onLikeClicked}
                className={like===1||like==null?"bi bi-hand-thumbs-down":"bi bi-hand-thumbs-down-fill"}
                ></i>{dislikes}
            </div>
        </>);

        return (
        <>
            {likeButtons}
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{likeTarget})(LikeButtons);