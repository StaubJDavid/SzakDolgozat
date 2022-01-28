import {FC, useState} from 'react'
import TextInput from './TextInput';
import {connect, useDispatch} from 'react-redux';
import {postComment} from '../actions/commentActions';

type Props = {
    auth:any,
    postComment:any,
    target_id:any
}

const CommentInput: FC<Props> = ({target_id, postComment, auth}) => {
    //const dispatch = useDispatch();
    const [text, setText] = useState("");

    return (
        <> 
            {auth.isAuthenticated?<div>
                <TextInput
                    name="text" 
                    value={text}
                    error={null} 
                    type="text"
                    onChange={(e:any) => setText(e.target.value)}    
                    placeholder="Text"
                />
                <button onClick={(e:any) => {postComment(target_id,text);setText("")}}
                className="btn btn-primary"
                type="button">Create</button>
            </div>:<></>}
        </>
    )

  
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{postComment})(CommentInput);