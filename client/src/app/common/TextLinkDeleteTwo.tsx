import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

type Props = {
    key:any,
    url:any,
    state_object:any,
    owned:any,
    text:any,
    onClick:any,
    onClickData:any
}

const TextLinkDeleteTwo: FC<Props> = ({key,url,state_object,owned,text,onClick,onClickData}) => {
    const history = useHistory();
    const [deleteHover, setDeleteHover] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

    let content = <></>

    if(owned){
        content = (
            <>
                <div className={classnames('col-md-10 text-break text-black fw-bold pointer-style rounded',{"bg-orange":!linkHover,"bg-yellow":linkHover, "bg-danger":deleteHover})}
                    onClick={() => history.push(url,state_object)} 
                    onMouseEnter={() => setLinkHover(true)}
                    onMouseLeave={() => setLinkHover(false)}>
                    {text}
                </div>
                <div className={classnames("col-md-2 d-flex align-items-center justify-content-center text-black pointer-style rounded",{"bg-yellow":linkHover,"bg-red":deleteHover,"bg-danger":!deleteHover && !linkHover})} 
                    onClick={() => onClick(onClickData)} 
                    onMouseEnter={() => setDeleteHover(true)}
                    onMouseLeave={() => setDeleteHover(false)} >
                    <i className="fa-solid fa-trash-can"></i>
                </div>
            </>
        )
    }else{
        content = (
        <>
            <div className={classnames('col-md-12 text-break text-black fw-bold pointer-style rounded',{"bg-orange":!linkHover,"bg-yellow":linkHover})}
            onClick={() => history.push(url,state_object)} 
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}>
                {text}
            </div>
        </>
        )
    }

    return(<>
        <div className="container px-3 py-1">
            <div className="row rounded">
                {content}
            </div>
        </div>
    </>
        
    )
}

export default TextLinkDeleteTwo;