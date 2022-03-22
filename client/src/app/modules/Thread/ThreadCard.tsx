import React, {FC,useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import LikeButtons from '../../common/LikeButtons';
import timeFormat from '../../helpers/timeFormat';
import classnames from 'classnames';

type Props = {
    thread:any,
    auth:any
}


const ThreadCard: FC<Props> = ({thread,auth}) => {
    const history = useHistory();
    const [titleHover,setTitleHover] = useState(false);
    const [nameHover,setNameHover] = useState(false);

    function toProfileClick(id:any){
        if(auth.isAuthenticated){
            history.push('/profile/'+ id,{})
        }
    }

    const {nickname,thread_id,title,created,views,likes,dislikes,like, text, user_id} = thread;
    return (
    <>
        <hr/>
        <div className="container-fluid bg-orange rounded">
            <div className="row justify-content-end mb-2 rounded">
                <div
                    style={{cursor:auth.isAuthenticated?"pointer":"auto"}}
                    onClick={() => toProfileClick(user_id)}
                    className={classnames("col-md-2 text-break align-middle rounded own-font",{"bg-yellow":nameHover&&auth.isAuthenticated,"bg-orange":!nameHover || !auth.isAuthenticated})}
                    onMouseEnter={() => setNameHover(true)}
                    onMouseLeave={() => setNameHover(false)}
                >
                    <h2>{nickname}</h2>
                </div>
                <div 
                    style={{cursor:"pointer"}}
                    onClick={() => history.push(`/thread/${thread_id}`,{thread: thread})}
                    className={classnames("col-md-4 text-break align-middle fw-bold rounded",{"bg-yellow":titleHover,"bg-orange":!titleHover})}
                    onMouseEnter={() => setTitleHover(true)}
                    onMouseLeave={() => setTitleHover(false)}
                ><p>{title}</p>
                </div>
                <div className="col-md-6 fw-bold">
                    {timeFormat(created)}
                </div>
            </div>
            <div className="row pb-2">
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12 mb-3 fw-bold">
                            Views: {views}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <LikeButtons target_id={thread_id} like={like} likes={likes} dislikes={dislikes} parent={""} type={"THREADS"} />
                        </div>
                    </div>
                </div>
                <div className="col-md-10 text-break rounded">
                    <textarea className="form-control form-control-lg" placeholder="">{text}</textarea>
                </div>
            </div>
        </div>
        <hr/>
    </>
    )
}

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps,{})(ThreadCard);