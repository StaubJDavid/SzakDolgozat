import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    onClick:any,
    bgColor:any,
    bgHoverColor:any,
    text:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const AddDelMangaTitle: FC<Props> = ({onClick,bgColor,bgHoverColor,text}) => {
    const [linkHover, setLinkHover] = useState(false);

    return(
    <div
        onClick={() => onClick()}
        className={classnames("flex-grow-1 align-middle rounded pointer-style fw-bold",{[bgColor]:!linkHover,[bgHoverColor]:linkHover})}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
    >
        {text}
    </div>
    )
}

export default AddDelMangaTitle;