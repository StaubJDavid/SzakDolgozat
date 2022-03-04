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

const TextLinkDelete: FC<Props> = ({key,url,state_object,owned,text,onClick,onClickData}) => {
    const history = useHistory();
    const [deleteHover, setDeleteHover] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

    let content = <></>

    if(owned){
        content = (
            <>
                <div className={classnames('col-md-10 text-break',{"bg-info":linkHover, "bg-danger":deleteHover})}
                    onClick={() => history.push(url,state_object)} 
                    onMouseEnter={() => setLinkHover(true)}
                    onMouseLeave={() => setLinkHover(false)}>
                    {text}
                </div>
                <div className={classnames("col-md-2 d-flex align-items-center justify-content-center",{"bg-info":linkHover,"bg-danger bg-gradient":deleteHover,"bg-danger":!deleteHover && !linkHover})} 
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
            <div className={classnames('col-md-12 text-break',{"bg-info":linkHover})}
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
            <div className="row border rounded">
                {content}
            </div>
        </div>
    </>
        
    )
}

/*
<div className='col-md-10 bg-info text-break'>
                    dsadsadsadsasdasdassssssssssssssssssssssssssssssssssssss
                </div>
                <div className="col-md-2 bg-danger d-flex align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                </div>
*/
export default TextLinkDelete;