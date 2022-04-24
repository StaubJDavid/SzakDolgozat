import {FC, useState} from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
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

    const cInput = (
    <div className="post-form mb-3">
        <div className="border-1 border-black rounded bg-own-dark">
            <div className="bg-orange rounded text-black p-2 fw-bold fs-4">
                Send a comment
            </div>
            <div className="card-body">
                <div className="form-group">
                    <TextArea
                        name="text" 
                        maxlength={255}
                        value={text}
                        error={null} 
                        onChange={(e:any) => setText(e.target.value)}  
                        placeholder="Your message here..."
                        disabled={false}
                    />
                </div>
                <br />
                <button onClick={(e:any) => {postComment(target_id,text);setText("")}} className="btn-yellow">Post comment</button>
            </div>
        </div>
    </div>
    )

    return (
        <> 
            {auth.isAuthenticated?cInput:<></>}
        </>
    )

  
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{postComment})(CommentInput);