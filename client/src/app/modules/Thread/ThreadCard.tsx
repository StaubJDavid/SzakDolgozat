import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LikeButtons from '../../common/LikeButtons';

type Props = {
    thread:any
}

type State = {

}

class ThreadCard extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }


    render() {
        const {nickname,thread_id,title,created,views,likes,dislikes,like} = this.props.thread;
        return (
        <>
            <hr/>
            <div className="container-fluid">
                <p>Creator: {nickname}</p>
                <p>Title: {title}</p>
                <p>Views: {views}</p>
                <p>Created: {created}</p>
                <Link to={{
                    pathname: `/thread/${thread_id}`,
                    state: {
                        thread: this.props.thread
                    }
                }}>Open thread</Link>
                <LikeButtons target_id={thread_id} like={like} likes={likes} dislikes={dislikes} parent={""} type={"THREADS"} />
            </div>
            <hr/>
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({

});

export default connect(mapStateToProps,{})(ThreadCard);