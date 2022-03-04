import React, { Component} from 'react';
import {connect} from 'react-redux';
import {searchForManga} from '../actions/mangaActions';
import LikeButtons from './LikeButtons';
import timeFormat from '../helpers/timeFormat';

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 border border-dark rounded">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>{nickname}</h2>
                            </div>
                            <hr/>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            {timeFormat(timestamp)}
                            </div>
                            <hr/>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <LikeButtons target_id={comment_id} like={like} likes={likes} dislikes={dislikes} parent={target_id} type={"COMMENT"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 text-break border border-dark rounded">
                        {comment}
                    </div>
                </div>
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