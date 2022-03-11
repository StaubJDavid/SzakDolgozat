import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    icon:any,
    onClick:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const RemoveButton: FC<Props> = ({icon,onClick}) => {
    const [linkHover, setLinkHover] = useState(false);

    return(
    <div
        style={{cursor:"pointer"}}
        className={classnames({"text-success":linkHover})}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
        onClick={() => onClick()}
    >
        <i className={icon} />
    </div>
    )
}

export default RemoveButton;