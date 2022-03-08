import React, { Component} from 'react';
import {connect} from 'react-redux';
import {addMangaProfile} from '../../actions/profileActions';
import classnames from 'classnames';
import SimpleButton from '../../common/SimpleButton';
import getTitle from '../../helpers/getTitle';
import LDRow from './LDRow';

type Props = {
    manga:any,
    auth:any,
    history:any,
    addMangaProfile:any
}

type State = {
    likeHover:boolean,
    dislikeHover:boolean
}


class Profile extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            likeHover:false,
            dislikeHover:false
        }
        
        this.onAddMangaClick = this.onAddMangaClick.bind(this);
    }

    // onClick={this.onAddMangaClick} data-type={2} data-id={element.id} data-name={element.attributes.title.en} 
    onAddMangaClick(dataType:any,dataId:any,dataName:any){
        this.props.addMangaProfile(Number(this.props.auth.user.id),
            Number(dataType),
            String(dataId),
            String(dataName)
        )
    }

    render() {
        let manga_search_results = this.props.manga.manga_search.data;

        return (
            <ul className="list-group list-group-flush">
                {manga_search_results?manga_search_results.map((element:any, i:number) => {
                    return  <li key={element.id} className="list-group-item">
                                <LDRow element={element}/>
                            </li>
                }):<></>}
            </ul>
        )
    }
}

const mapStateToProps = (state:any)=>({
    manga: state.manga,
    auth: state.auth
});

export default connect(mapStateToProps,{addMangaProfile})(Profile);