import {FC, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {addMangaProfile} from '../../actions/profileActions';
import classnames from 'classnames';
import SimpleButton from '../../common/SimpleButton';
import getTitle from '../../helpers/getTitle';
import TitleButton from '../../common/TitleButton';
import AddDelMangaTitle from '../../common/AddDelMangaTitle';

type Props = {
    element:any,
    auth:any,
    addMangaProfile:any
}

const LDRow: FC<Props> = ({element,auth,addMangaProfile}) => {
    const history = useHistory();
    const [likeHover, setLikeHover] = useState(false);
    const [dislikeHover, setDislikeHover] = useState(false);

    function onAddMangaClick(dataType:any,dataId:any,dataName:any){
        console.log(dataType);
        addMangaProfile(Number(auth.user.id),
            Number(dataType),
            String(dataId),
            String(dataName)
        )
    }

    return (
        <div className='d-flex flex-row rounded p-2 bg-orange'>
            <AddDelMangaTitle onClick={() => history.push('/manga/'+element.id)} text={getTitle(element.attributes.title)} bgColor={"bg-orange"} bgHoverColor={"bg-yellow"}/>
            <div
                className={classnames('text-center px-2 d-flex align-items-center',{"text-success":likeHover})}
                onMouseEnter={() => setLikeHover(true)}
                onMouseLeave={() => setLikeHover(false)}
                onClick={() => onAddMangaClick(2,element.id,getTitle(element.attributes.title))}
            >
                <i className="bi bi-hand-thumbs-up-fill"/>
            </div>
            <div
                className={classnames('text-center px-2 d-flex align-items-center',{"text-danger":dislikeHover})}
                onMouseEnter={() => setDislikeHover(true)}
                onMouseLeave={() => setDislikeHover(false)}
                onClick={() => onAddMangaClick(3,element.id,getTitle(element.attributes.title))}
            >
                <i className="bi bi-hand-thumbs-down-fill"/>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{addMangaProfile})(LDRow);