import {FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {subscribeToManga} from '../actions/profileActions';
import classnames from 'classnames';
import ISO6391 from 'iso-639-1';
import AddButton from '../common/AddButton';

type Props = {
    manga_id:any,
    subscribed_mangas:any,
    translatedLanguage:any,
    subscribeToManga:any,
};

const SubscribeToManga: FC<Props> = ({manga_id,translatedLanguage,subscribeToManga,subscribed_mangas}) => {

    const [mangas,setMangas] = useState([]);

    function onSubscribeClick(manga_id:string,translated_language:string){
        subscribeToManga(manga_id,translated_language);
    }

    function findTranslation(language:any){
        return mangas.some((m:any) => m.translated_language === language)
    }

    useEffect(() => {
        setMangas(subscribed_mangas.filter((sm:any) => sm.manga_id === manga_id));
        //console.log(mangas);
    },[])

    useEffect(() => {
        setMangas(subscribed_mangas.filter((sm:any) => sm.manga_id === manga_id));
        //console.log(mangas);
    },[subscribed_mangas])
    //setMangas(subscribed_mangas.filter((sm:any) => sm.manga_id === manga_id));


    return (
        <>
        <p>
            <button className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSubscribeToMangas"
                aria-expanded="false"
                aria-controls="collapseSubscribeToMangas"
            >
                Subscribe to get email of new chapters
            </button>
        </p>
        <div className="collapse" id="collapseSubscribeToMangas">
            <div className="container">
                {translatedLanguage.map((lang:any,i:number) => {
                    return (
                    <div className={classnames("row",{"bg-info":findTranslation(lang)})} >
                        <div className="col-8">
                            {ISO6391.getName(lang)}
                        </div>
                        <div className="col-4">
                            <AddButton icon={'bi bi-plus-square-fill'} onClick={() => onSubscribeClick(manga_id,lang)} />
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

export default connect(mapStateToProps, {subscribeToManga})(SubscribeToManga);