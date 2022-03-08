import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    text:any,
    pushTo:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const ScanProperty: FC<Props> = ({text,pushTo}) => {
    const history = useHistory();
    const [linkHover, setLinkHover] = useState(false);

    let content = <></>

    if(pushTo !== null && pushTo !== ""){
        content = (
        <div
            style={{cursor:"pointer"}}
            className={classnames('d-flex text-break',{"bg-light":linkHover})}
            onClick={() => window.location.replace(pushTo)} 
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
        >
                {text}
        </div>
        )
    }

    return(content)
}

export default ScanProperty;