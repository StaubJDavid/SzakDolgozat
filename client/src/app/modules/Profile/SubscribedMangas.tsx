import {FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {getSubscribedMangas, unsubscribeFromManga} from '../../actions/profileActions';
import classnames from 'classnames';
import RemoveButton from '../../common/RemoveButton';
import SimpleButton from '../../common/SimpleButton';
import TitleButton from '../../common/TitleButton';
import ISO6391 from 'iso-639-1';

type Props = {
    subscribed_mangas:any,
    getSubscribedMangas:any,
    unsubscribeFromManga:any
};

const SubscribedMangas: FC<Props> = ({subscribed_mangas,getSubscribedMangas,unsubscribeFromManga}) => {

    const [unsubHover, setUnsubHover] = useState(false);
    const history = useHistory();
    //Component Mount
    useEffect(() => {
        getSubscribedMangas();
    },[]);

    function onUnsubscribeClick(imt_id:number){
        unsubscribeFromManga(imt_id);
    }

    if(subscribed_mangas === null){
        return (
            <>
            <p>
                <button className="btn-black"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSubscribedMangas"
                    aria-expanded="false"
                    aria-controls="collapseSubscribedMangas"
                >
                    Latest Chapters of Subscribed Mangas
                </button>
            </p>
            <div className="collapse" id="collapseSubscribedMangas">
                <h4>You havent subscribed to any manga</h4>
            </div>
            </>
        )
    }
    return (
        <>
        <p>
            <button className="btn-black"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSubscribedMangas"
                aria-expanded="false"
                aria-controls="collapseSubscribedMangas"
            >
                Latest Chapters of Subscribed Mangas
            </button>
        </p>
        <div className="collapse" id="collapseSubscribedMangas">
            <div className="container">
                {subscribed_mangas.map((manga:any,i:number) => {
                    return (
                    <div className="row mb-1 bg-black rounded text-white">
                        <div className="col-8 p-0 rounded">
                            <TitleButton text={manga.manga_name} onClick={() => history.push('/manga/'+manga.manga_id)} bgColor={"bg-black"} bgHoverColor={"bg-own-dark"} />
                        </div>
                        <div className="col-2">
                            {ISO6391.getName(manga.translated_language)}
                        </div>
                        <div className="col-1 text-center">
                            <TitleButton text={manga.chapter} onClick={() => history.push('/manga/read/'+manga.chapter_id)} bgColor={"bg-black"} bgHoverColor={"bg-own-dark"} />
                        </div>
                        <div className="col-1">
                            <RemoveButton icon={'bi bi-trash-fill'} onClick={() => onUnsubscribeClick(manga.imt_id)} />
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
        </>
    )
};

const mapStateToProps = (state:any)=>({
    subscribed_mangas: state.profile.subscribed
});

export default connect(mapStateToProps, {getSubscribedMangas,unsubscribeFromManga})(SubscribedMangas);