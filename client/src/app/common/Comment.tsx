import React, { FC, useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {searchForManga} from '../actions/mangaActions';
import LikeButtons from './LikeButtons';
import timeFormat from '../helpers/timeFormat';
import classnames from 'classnames';

type Props = {
    auth:any,
    errors:any,
    data:any
}

const Comment: FC<Props> = ({errors,auth,data}) => {
    const history = useHistory();
    const [nameHover,setNameHover] = useState(false);

    function toProfileClick(id:any){
        if(auth.isAuthenticated){
            history.push('/profile/'+ id,{})
        }
    }

    
    let commentContent = <></>;
    if(data){
        let {comment,comment_id,dislikes,likes,nickname,target_id,timestamp,user_id,like} = data;
        commentContent = (
        <>
        <div className="container-fluid">
            <div className="row border border-dark rounded py-1 bg-orange">
                <div className="col-md-2">
                    <div className="row">
                        <div
                            style={{cursor:auth.isAuthenticated?"pointer":"auto"}}
                            className={classnames("col-md-12 text-center text-break fw-bold own-font rounded",{"bg-yellow":nameHover&&auth.isAuthenticated})}
                            onClick={() => toProfileClick(user_id)}
                            onMouseEnter={() => setNameHover(true)}
                            onMouseLeave={() => setNameHover(false)}
                        >
                            <h2>{nickname}</h2>
                        </div>
                    </div>
                    <hr className='my-1'/>
                    <div className="row">
                        <div className="col-md-12 text-center fw-bold fst-italic">
                            {timeFormat(timestamp)}
                        </div>
                    </div>
                    <hr className='my-1'/>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <LikeButtons target_id={comment_id} like={like} likes={likes} dislikes={dislikes} parent={target_id} type={"COMMENT"} />
                        </div>
                    </div>
                </div>
                <div className="col-md-10 text-break p-2 fw-bold">
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

const mapStateToProps = (state:any)=>({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{})(Comment);