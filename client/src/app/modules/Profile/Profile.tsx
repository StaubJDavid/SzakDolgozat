import React, { Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfile, addMangaProfile,deleteMangaProfile,updateProfile} from '../../actions/profileActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TextInput from '../../common/TextInput';
import isSameUser from '../../helpers/isSameUser';
import SearchBar from '../../common/SearchBar';
import AddDelManga from './AddDelManga';
import Lists from './Lists';

type Props = {
    auth:any,
    errors:any,
    profile:any,
    history:any,
    match:any,
    getProfile:any,
    addMangaProfile:any,
    deleteMangaProfile:any,
    updateProfile:any
}

type State = {
    error: any,
    own:boolean,
    bio_l:string,
    bio_edit:boolean,
    count:number
}


class Profile extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            error: {},
            own: false,
            bio_l:"",
            bio_edit:true,
            count:0
        }
        
        this.onAddMangaClick = this.onAddMangaClick.bind(this);
        this.onDeleteMangaClick = this.onDeleteMangaClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }


    onEditClick(e:any){
        console.log("Clicked on Edit");
        this.setState({bio_l:this.props.profile.profile.bio.value});
        this.setState({bio_edit:!this.state.bio_edit});
    }

    onChangeEdit(e:any){
        this.setState({bio_l: String(e.target.value)} as any);
    }

    onSaveClick(e:any){
        //console.log(this.state.bio_l);
        this.props.updateProfile(Number(this.props.auth.user.id),
                                Number(this.props.profile.profile.bio.ud_id),
                                String(this.state.bio_l)
        )
        this.onEditClick({});
    }

    onAddMangaClick(e:any){
        this.props.addMangaProfile(Number(this.props.auth.user.id),
            Number(e.target.getAttribute("data-type")),
            String(e.target.getAttribute("data-id")),
            String(e.target.getAttribute("data-name"))
        )
    }

    onDeleteMangaClick(e:any){
        this.props.deleteMangaProfile(Number(this.props.auth.user.id),
            Number(e.target.getAttribute("data-id"))
        )
    }

    componentDidMount(){   
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }

        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        this.setState({own: isSameUser(this.props.auth,url)});
        this.props.getProfile(parseInt(url));
        if(this.props.profile.profile != null){
            this.setState({bio_l: this.props.profile.profile.bio.value});
        }
    }

    componentDidUpdate(prevProps:any){
        if(this.props.match.params.id!== prevProps.match.params.id){
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            this.setState({own: isSameUser(this.props.auth,url)});
            this.props.getProfile(parseInt(url));

            if(this.props.profile.profile != null){
                this.setState({bio_l: this.props.profile.profile.bio.value});
            }
        }
    }

    render() {
        let {loading, profile} = this.props.profile;

        let profileContent = <></>;

        if(profile === null || loading){
            profileContent = <></>;
        }else{
            let {nickname, registered, last_login, bio, liked_manga, disliked_manga, friends} = this.props.profile.profile;
            //let manga_search_results = this.props.profile.manga_search.data;

            if(this.state.count === 0){
                if(this.props.profile.profile != null){
                    this.setState({bio_l: this.props.profile.profile.bio.value});
                    this.setState({count: 1});
                }
            }

            profileContent = (
                <>
                    <p>Nickname: {nickname}</p>
                    <p>Registered: {registered}</p>
                    <p>Last logged in: {last_login}</p>
                    <p key={bio.ud_id}>Bio: {bio.value}</p>
                    {this.state.own?(<><i onClick={this.onEditClick} className="bi bi-pencil fa-5x" data-bs-toggle="collapse" data-bs-target="#collapseEditSave" aria-expanded="false" aria-controls="collapseEditSave"/>
                    <div> 
                        <div className="collapse" id="collapseEditSave">
                            <TextInput
                                name="bio_l" 
                                value={this.state.bio_l}
                                error={this.state.error.thing}
                                type="text"
                                onChange={this.onChangeEdit}  
                                placeholder="About me"
                                disabled={this.state.bio_edit}
                            />
                            <button onClick={this.onSaveClick} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEditSave" aria-expanded="false" aria-controls="collapseEditSave">Save</button>
                        </div>
                    </div></>):<></>}

                    {this.state.own?(<div>
                        <p>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLikeManga" aria-expanded="false" aria-controls="collapseLikeManga">
                                Add Manga to Like/Dislike
                            </button>
                        </p>
                        <div className="collapse" id="collapseLikeManga">
                                <SearchBar />
                                <AddDelManga />
                        </div>
                    </div>):<></>}

                    <p>Liked Manga:</p>
                    <ul>{this.props.profile.profile.liked_manga.map((element:any, i:number) => {
                        return  <li key={element.ud_id}>
                                    <Link to={'/manga/'+ element.manga_id} >{element.value}</Link>
                                    {this.state.own?<button onClick={this.onDeleteMangaClick} data-id={element.ud_id} type="button" className="btn-close" aria-label="Close"></button>:<></>}
                                </li>
                        })}
                    </ul>

                    <p>Disliked Manga:</p>
                    <ul>{this.props.profile.profile.disliked_manga.map((element:any, i:number) => {
                        return  <li key={element.ud_id}>
                                    <Link to={'/manga/'+ element.manga_id} >{element.value}</Link>
                                    {this.state.own?<button onClick={this.onDeleteMangaClick} data-id={element.ud_id} type="button" className="btn-close" aria-label="Close"></button>:<></>}
                                </li>
                        })}
                    </ul>

                    <p>Friends:</p>
                    <ul>{friends.map((element:any, i:number) => {
                        return <li key={element.ud_id}><Link to={'/profile/'+ element.fid} >{element.fnickname}</Link></li>
                        })}
                    </ul>
                    <Lists />
                </>
                );
        }

        return (
            <div>
                {profileContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps,{getProfile, addMangaProfile,deleteMangaProfile,updateProfile})(Profile);