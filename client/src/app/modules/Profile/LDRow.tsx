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
    const [likeHover, setLikeHover] = useState(false);//Lájk gombon van az egér állapot
    const [dislikeHover, setDislikeHover] = useState(false);//Dislájk gombon van az egér állapot

    //Funkció ami hozzáadja a mangát a profil részleteihez redux akciókkal
    function onAddMangaClick(dataType:any,dataId:any,dataName:any){
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
                className={classnames('text-center px-2 d-flex align-items-center',{"text-success":likeHover})}//Ha a lájkon van az egér, a divben lévő ikon zöld lesz
                onMouseEnter={() => setLikeHover(true)}//Egeret ráviszik a divre, lájk booleant igazra állítja
                onMouseLeave={() => setLikeHover(false)}//Egeret elviszik a divről, lájk booleant hamisra állítja
                onClick={() => onAddMangaClick(2,element.id,getTitle(element.attributes.title))}//Kattintási esemény beállítása
            >
                <i className="bi bi-hand-thumbs-up-fill"/>{/* Bootstrap Ikon használata */}
            </div>
            <div
                className={classnames('text-center px-2 d-flex align-items-center',{"text-danger":dislikeHover})}//Ha a lájkon van az egér, a divben lévő ikon piros lesz
                onMouseEnter={() => setDislikeHover(true)}
                onMouseLeave={() => setDislikeHover(false)}
                onClick={() => onAddMangaClick(3,element.id,getTitle(element.attributes.title))}
            >
                <i className="bi bi-hand-thumbs-down-fill"/>
            </div>
        </div>
    )
}

//Itt adjuk meg hogy a globális store-ból melyik változót/állapotot éri el
const mapStateToProps = (state:any)=>({
    auth: state.auth
});

//React redux connect függvényébe megadjuk hogy
// milyen állapotot akar elérni a komponens és 
//milyen akciókat akar elvégezni
export default connect(mapStateToProps,{addMangaProfile})(LDRow);