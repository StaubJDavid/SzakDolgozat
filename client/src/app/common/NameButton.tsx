import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ISO6391 from 'iso-639-1';

type Props = {
    nickname:any,
    onClick:any
}

//ISO6391.getName(ch.attributes.translatedLanguage)

const NameButton: FC<Props> = ({nickname,onClick}) => {
    const [linkHover, setLinkHover] = useState(false);

    return(
    <div onClick={() => onClick()}
        className={classnames("row rounded align-items-middle pointer-style",{"bg-orange":!linkHover,"bg-yellow":linkHover})}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
    >
        <div className="col align-self-center">
            <div className="fs-5 fw-bold text-center text-break">{/*<NameButton text={nickname} onClick={() => this.props.history.push('/profile/'+ element.sender_id)} />*/}
                {nickname}
            </div>
        </div>
    </div>
    )
}

export default NameButton;