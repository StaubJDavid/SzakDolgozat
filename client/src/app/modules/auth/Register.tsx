import React, { Component } from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions'
import {withRouter} from 'react-router-dom';
import TextInput from '../../common/TextInput';

type Props = {
    registerUser:any,
    auth:any,
    errors:any,
    history:any
}

type State = {
    nickname: string,
    email: string,
    password: string,
    password2: string,
    errors: any
}

class Register extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            nickname: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps:any){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
        /*console.log(e.target.name);
        console.log(e.target.value);*/
    }

    onSubmit(e:any){
        e.preventDefault();

        const newUser = {
            nickname: this.state.nickname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        /**/
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state; 

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    name="nickname" 
                                    value={this.state.nickname}
                                    error={errors.nickname} 
                                    type="text"
                                    onChange={this.onChange}  
                                    placeholder="Nickname"
                                />
                                <br />
                                <TextInput
                                    name="email" 
                                    value={this.state.email}
                                    error={errors.email} 
                                    type="email"
                                    onChange={this.onChange}  
                                    placeholder="Email Address"
                                />
                                <br />
                                <TextInput
                                    name="password" 
                                    value={this.state.password}
                                    error={errors.password} 
                                    type="password"
                                    onChange={this.onChange}  
                                    placeholder="Password"
                                />
                                <br />
                                <TextInput
                                    name="password2" 
                                    value={this.state.password2}
                                    error={errors.password2} 
                                    type="password"
                                    onChange={this.onChange}  
                                    placeholder="Repeat password"
                                />
                                
                                <div className="d-flex justify-content-center">
                                    <input value="Register" type="submit" className="btn btn-info btn-block m-4" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register as any));