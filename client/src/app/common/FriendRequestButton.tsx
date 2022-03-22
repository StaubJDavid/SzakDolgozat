import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    onClick:any,
    bgColor:any,
    bgHoverColor:any,
    icon:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const FriendRequestButton: FC<Props> = ({onClick,bgColor,bgHoverColor,icon}) => {
    const [linkHover, setLinkHover] = useState(false);
    /*const [baseColor, setBaseColor] = useState(bgColor);
    const [hoverColor, setLinkHover] = useState(bgHoverColor);*/

    return(
    <div
        className={classnames("col fa-lg py-1 rounded d-flex align-items-center justify-content-center pointer-style",{[bgColor]:!linkHover, [bgHoverColor]:linkHover})}
        onClick={() => onClick()}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
    >
        <i className={icon} />
    </div>
    )
}

export default FriendRequestButton;