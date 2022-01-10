import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';

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
            this.props.history.push('/profile');
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
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                    type="email" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.email})} 
                                    placeholder="Email Address"
                                    value={this.state.email} 
                                    onChange={this.onChange}
                                    name="email" />
                                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.password})} 
                                    placeholder="Password" 
                                    value={this.state.password} 
                                    onChange={this.onChange}
                                    name="password" />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
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