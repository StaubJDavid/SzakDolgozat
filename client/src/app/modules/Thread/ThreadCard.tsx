import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LikeButtons from '../../common/LikeButtons';
import timeFormat from '../../helpers/timeFormat';

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
        const {nickname,thread_id,title,created,views,likes,dislikes,like, text} = this.props.thread;
        return (
        <>
            <hr/>
            <div className="container-fluid">
                <div className="row justify-content-end">
                    <div className="col-md-2 text-break align-middle">
                        {nickname}
                    </div>
                    <div className="col-md-2 text-break align-middle">
                        <Link to={{
                            pathname: `/thread/${thread_id}`,
                            state: {
                                thread: this.props.thread
                            }
                        }}>{title}</Link>
                    </div>
                    <div className="col-md-8">
                        {timeFormat(created)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12">
                                Views: {views}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <LikeButtons target_id={thread_id} like={like} likes={likes} dislikes={dislikes} parent={""} type={"THREADS"} />
                            </div>
                        </div>
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
}

const mapStateToProps = (state:any)=>({

});

export default connect(mapStateToProps,{})(ThreadCard);