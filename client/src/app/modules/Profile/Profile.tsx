import React, { Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {getProfile, addMangaProfile,deleteMangaProfile,updateProfile, clearError} from '../../actions/profileActions';
import { deleteFriend } from '../../actions/friendActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import isSameUser from '../../helpers/isSameUser';
import SearchBar from '../../common/SearchBar';
import AddDelManga from './AddDelManga';
import Lists from './Lists';
import FriendRequests from './FriendRequests';
import SendFriendRequest from './SendFriendRequest';
import timeFormat from '../../helpers/timeFormat';
import TextLinkDelete from '../../common/TextLinkDelete';
import SubscribedMangas from './SubscribedMangas';

type Props = {
    auth:any,
    errors:any,
    profile:any,
    history:any,
    match:any,
    getProfile:any,
    addMangaProfile:any,
    deleteMangaProfile:any,
    updateProfile:any,
    clearError:any,
    deleteFriend:any
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
        this.onDeleteFriendClick = this.onDeleteFriendClick.bind(this);
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
            Number(e)
        )
    }

    onDeleteFriendClick(e:any){
        this.props.deleteFriend(
            Number(this.props.auth.user.id),
            Number(e)
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
        
        if(this.props.errors.no_user){
            console.log(this.props.errors.no_user);
            this.props.clearError();
            this.props.history.push('/');
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

        if(this.props.errors.no_user){
            console.log(this.props.errors.no_user);
            this.props.clearError();
            this.props.history.push('/');
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

            let ldmangaContent = <></>
            if(this.state.own) {
                ldmangaContent = (<>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className='text-center'>Liked Manga</h4>
                            </div>
                            <div className="col-md-6">
                                <h4 className='text-center'>Disiked Manga</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="card">
                                    {this.props.profile.profile.liked_manga.map((element:any, i:number) => {
                                        return  <TextLinkDelete key={element.ud_id}
                                                    url={'/manga/'+ element.manga_id}  
                                                    state_object={{}}
                                                    owned={this.state.own}
                                                    text={element.value}
                                                    onClick={this.onDeleteMangaClick}
                                                    onClickData={element.ud_id}
                                                />
                                        })}
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="card">
                                    {this.props.profile.profile.disliked_manga.map((element:any, i:number) => {
                                        return  <TextLinkDelete key={element.ud_id}
                                                    url={'/manga/'+ element.manga_id}  
                                                    state_object={{}}
                                                    owned={this.state.own}
                                                    text={element.value}
                                                    onClick={this.onDeleteMangaClick}
                                                    onClickData={element.ud_id}
                                                />
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {this.state.own?(<div>
                                <p>
                                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLikeManga" aria-expanded="false" aria-controls="collapseLikeManga">
                                        Add Manga to Like/Dislike
                                    </button>
                                </p>
                                <div className="collapse" id="collapseLikeManga">
                                        <SearchBar />
                                        <AddDelManga history={this.props.history} />
                                </div>
                            </div>):<></>
                        }
                    </div>
                    </>
                )
            }else{
                ldmangaContent = (<>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className='text-center'>Liked Manga</h4>
                            </div>
                            <div className="col-md-6">
                                <h4 className='text-center'>Disiked Manga</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="card">
                                    {this.props.profile.profile.liked_manga.map((element:any, i:number) => {
                                        return  <TextLinkDelete key={element.ud_id}
                                                    url={'/manga/'+ element.manga_id}  
                                                    state_object={{}}
                                                    owned={this.state.own}
                                                    text={element.value}
                                                    onClick={this.onDeleteMangaClick}
                                                    onClickData={element.ud_id}
                                                />
                                        })}
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="card">
                                    {this.props.profile.profile.disliked_manga.map((element:any, i:number) => {
                                        return  <TextLinkDelete key={element.ud_id}
                                                    url={'/manga/'+ element.manga_id}  
                                                    state_object={{}}
                                                    owned={this.state.own}
                                                    text={element.value}
                                                    onClick={this.onDeleteMangaClick}
                                                    onClickData={element.ud_id}
                                                />
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }

            profileContent = (
                <>
                <div className="container-fluid">
                    <div className="row gx-5">
                        <div className="col-md-9">
                            <div className="row border rounded mb-4 p-4 bg-light">
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3>{nickname}</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>Registered<br/>{timeFormat(registered)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>Last login<br />{timeFormat(last_login)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {!this.state.own&&!this.props.profile.profile.are_friends?
                                                <SendFriendRequest />:<></>
                                            }  
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div key={bio.ud_id} className="form-group">
                                                <textarea 
                                                disabled={true}
                                                rows={4}
                                                maxLength={255}
                                                className={"form-control form-control-lg"} 
                                                value={bio.value} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.state.own?(<><i onClick={this.onEditClick} className="bi bi-pencil" data-bs-toggle="collapse" data-bs-target="#collapseEditSave" aria-expanded="false" aria-controls="collapseEditSave"/>
                                                <div> 
                                                    <div className="collapse" id="collapseEditSave">
                                                        <TextArea
                                                            name="bio_l"  
                                                            maxlength={255}
                                                            value={this.state.bio_l}
                                                            error={this.state.error.thing} 
                                                            onChange={this.onChangeEdit}  
                                                            placeholder="About me"
                                                            disabled={false}
                                                        />
                                                        <button onClick={this.onSaveClick} className="btn btn-primary mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEditSave" aria-expanded="false" aria-controls="collapseEditSave">Save about me changes</button>
                                                    </div>
                                                </div></>):<></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {this.state.own?<div className="row border rounded mb-4 p-4 bg-light">
                                <div className="col-md-12 text-center">
                                    <div className="container">
                                        {this.state.own?<FriendRequests history={this.props.history} />:<></>}
                                    </div>
                                </div>
                            </div>:<></>}

                            {this.state.own?<div className="row border rounded mb-4 p-4 bg-light">
                                <div className="col-md-12 text-center">
                                    <div className="container">
                                        <SubscribedMangas />
                                    </div>
                                </div>
                            </div>:<></>}
                            
                            <div className="row border rounded mb-4 p-4 bg-light">
                                {ldmangaContent}
                            </div>

                            <div className="row border rounded mb-4 p-4 bg-light">
                                <div className="col-md-12">
                                    <Lists />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 border rounded p-2 bg-light">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="text-center">Friendlist</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        {friends.map((element:any, i:number) => {
                                            return (
                                                    <TextLinkDelete key={element.fid}
                                                        url={'/profile/'+ element.fid}  
                                                        state_object={{}}
                                                        owned={this.state.own}
                                                        text={element.fnickname}
                                                        onClick={this.onDeleteFriendClick}
                                                        onClickData={element.fid}
                                                    />
                                            )
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps,{deleteFriend,clearError,getProfile, addMangaProfile,deleteMangaProfile,updateProfile})(Profile);