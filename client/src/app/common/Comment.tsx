import React, { Component} from 'react';
import {connect} from 'react-redux';
import {searchForManga} from '../actions/mangaActions';
import LikeButtons from './LikeButtons';

type Props = {
    auth:any,
    errors:any,
    data:any
}

type State = {

}


class Comment extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }

    }

    render() {
        let commentContent = <></>;
        if(this.props.data){
            let {comment,comment_id,dislikes,likes,nickname,target_id,timestamp,user_id,like} = this.props.data;
            commentContent = (
            <>
            <hr/>
            <div className="container-fluid">
                <p>{nickname}:</p>
                <p>{comment}</p>
                <p>{timestamp}</p>
                <LikeButtons target_id={comment_id} like={like} likes={likes} dislikes={dislikes} parent={target_id} type={"COMMENT"} />
            </div>
            <hr/>
            </>
            )
        }
        return (
        <>
            {commentContent}
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{})(Comment);