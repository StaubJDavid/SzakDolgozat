import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setThread,getThread} from '../../actions/threadActions';
import {getComments} from '../../actions/commentActions';
import Comment from '../../common/Comment';
import LikeButtons from '../../common/LikeButtons';
import CommentInput from '../../common/CommentInput';
import timeFormat from '../../helpers/timeFormat';

type Props = {
    thread:any,
    comments:any,
    location:any,
    setThread:any,
    getThread:any,
    getComments:any
}

type State = {

}

class Thread extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    componentDidMount() {
        if(this.props.location.state){
            this.props.setThread(this.props.location.state.thread);
        }else{
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            this.props.getThread(url);
        }
    }

    render() {

        let threadContent = <></>;
        let commentContent = <></>;
        let commentInput = <></>;

        if(this.props.thread.thread != null){
            const {nickname,thread_id,title,text,created,views,likes,dislikes,like} = this.props.thread.thread;
            commentInput = (<CommentInput target_id={thread_id} />)
            threadContent = (
            <>
            <hr/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 text-break align-middle">
                        <h1>{nickname}</h1>
                    </div>
                    <div className="col-md-3 text-break align-middle">
                        <h4>{title}</h4>
                    </div>
                    <div className="col-md-3 align-middle">
                        Views: {views}
                    </div>
                    <div className="col-md-3 align-middle text-right">
                        {timeFormat(created)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        {/*At like button the parent is thread_id */}
                        <LikeButtons target_id={thread_id} like={like} likes={likes} dislikes={dislikes} parent={thread_id} type={"THREAD"} />
                    </div>
                    <div className="col-md-10 text-break border border-dark rounded">
                        {text}
                    </div>
                </div>
            </div>
            <hr/>
            </>
            )
        }

        if(this.props.comments.comments != null){
            let cms = this.props.comments.comments;
            commentContent = (
            <>
                {cms.map((element:any, i:number) => {
                return  <Comment data={element} key={`comment${i}`}/>
                })}
            </>
            ) 
        }

        return (
            <div>
                {threadContent}
                {commentInput}
                {commentContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    thread: state.thread,
    comments: state.comments
});

export default connect(mapStateToProps,{setThread,getThread,getComments})(Thread);