import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextInput from '../../common/TextInput';

type Props = {
    auth:any,
    errors:any,
    loginUser:any,
    history:any
}

type State = {
    email: string,
    password: string,
    errors: any
}

class Login extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            email: '',
            password: '',
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
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/');
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
        /*console.log(e.target.name);
        console.log(e.target.value);*/
    }

    onSubmit(e:any){
        e.preventDefault();

        const User = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(User);
    }

    render() {
        const {errors} = this.state; 

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center text-orange own-font">Login</h1>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    name="email" 
                                    value={this.state.email}
                                    error={errors.email} 
                                    type="email"
                                    onChange={this.onChange}  
                                    placeholder="Email Address"
                                    label={"E-mail"}
                                />
                                <br />
                                <TextInput 
                                    type="password"
                                    name="password"
                                    value={this.state.password} 
                                    onChange={this.onChange}
                                    error={errors.password}
                                    placeholder="Password"
                                    label={"Password"}
                                />
                                
                                <div className="d-flex justify-content-center">
                                    <input value="Login" type="submit" className="btn-yellow mt-4" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);