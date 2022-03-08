import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    text:any,
    onClick:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const SimpleButton: FC<Props> = ({text,onClick}) => {
    const [linkHover, setLinkHover] = useState(false);

    return(
    <div
        style={{cursor:"pointer"}}
        className={classnames('d-flex text-break',{"bg-light":linkHover})}
        onClick={() => onClick()} 
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
    >
        {text}
    </div>
    )
}

export default SimpleButton;