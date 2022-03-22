import React, { Component} from 'react';
import {connect} from 'react-redux';
import {likeTarget} from '../actions/commentActions';
import classnames from 'classnames';
import TextInput from './TextInput';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
                e,
                this.props.type,
                this.props.parent
            )
            
        }
    }

    render() {
        let {like,likes,dislikes} = this.props;
        
        let likeButtons = (<>
            <button data-val={1} onClick={() => this.onLikeClicked(1)} type="button" className={classnames("btn mr-1 border-black",{"bg-success":like===1, "bg-black":like==null || like===0})}>
                <i className={classnames("fas fa-thumbs-up",{"text-success":like==null || like===0, "text-light":like===1})}>  {likes}</i>
            </button>
            <button data-val={0} onClick={() => this.onLikeClicked(0)} type="button" className={classnames("btn mr-1 border-black",{"bg-danger":like===0, "bg-black":like==null || like===1})}>
                <i className={classnames("fas fa-thumbs-down",{"text-danger":like==null || like===1, "text-light":like===0})}>  {dislikes}</i>
            </button>
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