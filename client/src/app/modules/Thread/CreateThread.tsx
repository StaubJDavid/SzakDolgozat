import {FC, useState} from 'react'
import { useHistory } from "react-router";
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import {useDispatch} from 'react-redux';
import {createThread} from '../../actions/threadActions';

type Props = {
}

const CreateThread: FC<Props> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    return (
        <> 
            <p>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseCreateThread`} aria-expanded="false" aria-controls={`collapseCreateThread`}>
                    Create Thread
                </button>
            </p>
            <div className="collapse" id={`collapseCreateThread`}>
                <TextInput
                    name="title" 
                    value={title}
                    error={null} 
                    type="text"
                    onChange={(e:any) => setTitle(e.target.value)}  
                    placeholder="Thread Title"
                />
                <div className='mb-2'></div>
                <TextArea
                    name="text" 
                    maxlength={255}
                    value={text}
                    error={null} 
                    onChange={(e:any) => setText(e.target.value)}  
                    placeholder="Thread Text"
                    disabled={false}
                />
                <button onClick={(e:any) => dispatch(createThread(title,text,history))}
                        className="btn btn-primary mt-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseCreateThread"
                        aria-expanded="false"
                        aria-controls="collapseCreateThread">Create
                </button>
            </div>
        </>
    )

  
}

export {CreateThread}