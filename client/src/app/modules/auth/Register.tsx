import React, { Component } from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions'
import {withRouter} from 'react-router-dom';

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
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.nickname})} 
                                    placeholder="Nickname" 
                                    name="nickname" 
                                    value={this.state.nickname} 
                                    onChange={this.onChange}
                                    required />
                                    {errors.nickname && (<div className='invalid-feedback'>{errors.nickname}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="email" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.email})} 
                                    placeholder="Email Address" 
                                    name="email" value={this.state.email} 
                                    onChange={this.onChange}
                                    required />
                                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.password})} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={this.state.password} 
                                    onChange={this.onChange}
                                    required />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" 
                                    className={classnames("form-control form-control-lg",{"is-invalid":errors.password2})}  
                                    placeholder="Confirm Password" 
                                    name="password2" 
                                    value={this.state.password2} 
                                    onChange={this.onChange}
                                    required />
                                    {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
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

const mapStateToProps = (state:any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register as any));