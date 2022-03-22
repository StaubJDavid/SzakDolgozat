import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setThread,getThread} from '../../actions/threadActions';
import {getComments} from '../../actions/commentActions';
import Comment from '../../common/Comment';
import LikeButtons from '../../common/LikeButtons';
import CommentInput from '../../common/CommentInput';
import timeFormat from '../../helpers/timeFormat';
import classnames from 'classnames';

type Props = {
    thread:any,
    auth:any,
    comments:any,
    location:any,
    history:any,
    setThread:any,
    getThread:any,
    getComments:any
}

type State = {
    nameHover:boolean
}

class Thread extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            nameHover:false
        }
        
        this.toProfileClick = this.toProfileClick.bind(this);
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

    toProfileClick(id:any){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/profile/'+ id,{})
        }
    }

    render() {

        let threadContent = <></>;
        let commentContent = <></>;
        let commentInput = <></>;

        if(this.props.thread.thread != null){
            const {nickname,thread_id,title,text,created,views,likes,dislikes,like,user_id} = this.props.thread.thread;
            commentInput = (<CommentInput target_id={thread_id} />)
            threadContent = (
            <>
            <hr/>
            <div className="container-fluid bg-orange rounded p-3">
                <div className="row mb-2">
                    <div
                        style={{cursor:this.props.auth.isAuthenticated?"pointer":"auto"}}
                        className={classnames("col-md-3 text-break align-middle rounded fw-bold own-font",{"bg-yellow":this.state.nameHover&&this.props.auth.isAuthenticated,"bg-orange":!this.state.nameHover || !this.props.auth.isAuthenticated})}
                        onClick={() => this.toProfileClick(user_id)}
                        onMouseEnter={() => this.setState({nameHover:true})}
                        onMouseLeave={() => this.setState({nameHover:false})}
                    >
                        <h1>{nickname}</h1>
                    </div>
                    <div className="col-md-3 text-break align-middle fw-bold own-font">
                        <h4>{title}</h4>
                    </div>
                    <div className="col-md-3 align-middle fw-bold own-font">
                        Views: {views}
                    </div>
                    <div className="col-md-3 align-middle text-right fw-bold own-font">
                        {timeFormat(created)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        {/*At like button the parent is thread_id */}
                        <LikeButtons target_id={thread_id} like={like} likes={likes} dislikes={dislikes} parent={thread_id} type={"THREAD"} />
                    </div>
                    <div className="col-md-10 text-break border border-dark rounded text-white fw-bold bg-black">
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
    auth:state.auth,
    thread: state.thread,
    comments: state.comments
});

export default connect(mapStateToProps,{setThread,getThread,getComments})(Thread);