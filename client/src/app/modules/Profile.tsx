import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfile} from '../actions/profileActions';

type Props = {
    auth:any,
    profile:any,
    history:any,
    match:any,
    getProfile:any
}

type State = {
    user:any,
    id:number
}


class Profile extends Component<Props,State> {
    componentDidMount(){   
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }

        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        console.log(url);
        this.props.getProfile(parseInt(url));
    }

    componentDidUpdate(prevProps:any){
        if(this.props.match.params.id!== prevProps.match.params.id){
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            console.log(url);
            this.props.getProfile(parseInt(url));
        }
    }

    render() {
        let {loading, profile} = this.props.profile;
        
        console.log(this.props.profile);

        let profileContent = <></>;

        if(profile === null || loading){
            profileContent = <></>;
        }else{
            let {nickname, registered, last_login, bio, liked_manga, disliked_manga, friends} = this.props.profile.profile;
        
            profileContent = (
                <>
                    <p>Nickname: {nickname}</p>
                    <p>Registered: {registered}</p>
                    <p>Last logged in: {last_login}</p>
                    <p>Bio: {bio}</p>

                    <p>Liked Manga:</p>
                    <ul>{liked_manga.map((element:any, i:number) => {
                        return <li>{element}</li>
                        })}
                    </ul>

                    <p>Disliked Manga:</p>
                    <ul>{disliked_manga.map((element:any, i:number) => {
                        return <li>{element}</li>
                        })}
                    </ul>

                    <p>Friends:</p>
                    <ul>{friends.map((element:any, i:number) => {
                        return <Link to={'/profile/'+ element.fid} >{element.fnickname}</Link>
                        })}
                    </ul>
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
    profile: state.profile
});

export default connect(mapStateToProps,{getProfile})(Profile);