import React, { Component} from 'react';
import {connect} from 'react-redux';
import {addMangaProfile} from '../../actions/profileActions';

type Props = {
    manga:any,
    auth:any
    addMangaProfile:any
}

type State = {
}


class Profile extends Component<Props,State> {
    constructor(props:any){
        super(props);
        
        this.onAddMangaClick = this.onAddMangaClick.bind(this);
    }


    onAddMangaClick(e:any){
        this.props.addMangaProfile(Number(this.props.auth.user.id),
            Number(e.target.getAttribute("data-type")),
            String(e.target.getAttribute("data-id")),
            String(e.target.getAttribute("data-name"))
        )
    }

    render() {
        let manga_search_results = this.props.manga.manga_search.data;

        return (
            <ul className="list-group list-group-flush">
                {manga_search_results?manga_search_results.map((element:any, i:number) => {
                    return  <li key={element.id} className="list-group-item">
                                {element.attributes.title.en}
                                <i onClick={this.onAddMangaClick} data-type={2} data-id={element.id} data-name={element.attributes.title.en} className="bi bi-hand-thumbs-up"/>
                                <i onClick={this.onAddMangaClick} data-type={3} data-id={element.id} data-name={element.attributes.title.en} className="bi bi-hand-thumbs-down"/>
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