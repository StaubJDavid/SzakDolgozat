import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';
import {clearProfile} from '../actions/profileActions';

type Props = {
    auth:any,
    logoutUser:any,
    clearProfile:any
}

type State = {

}

class Navbar extends Component<Props,State> {

    onLogoutClick(e:any){
        //Olyan href ek keresése amiről elkell vinni az emberkét
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/profile/'+ user.id} >{user.nickname}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" onClick={this.onLogoutClick.bind(this)} className="nav-link">Logout</Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">PetyDex</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Manga Search</Link>
                            </li>
                        </ul>

                        {isAuthenticated?authLinks:guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state:any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser,clearProfile})(Navbar);