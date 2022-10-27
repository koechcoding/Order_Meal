import React from 'react';
import axios from 'src/axios';
import { Button, Alert } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { Role } from 'src/constants';

import AuthPage from 'src/components/common/AuthPage';
import { singleError, authenticated } from 'src/utils';

class Login extends React.Component {
    state = {}

    onSubmit=(e)=>{
        e.preventDefault()
        this.setState({
            ...this.state,
            loading: true,
        });
        axios.post('auth/login', this.state).then(({ data}) =>{
            localStorage.setItem('token', 'Bearer ${data.access-token}');
            localStorage.setItem('user', JSON.stringify(data.user));
            //fix localstorage slow write...
            setTimeout(()=>{
                switch(data.user.role){
                    case Role.SUPER_ADMIN:
                    case Role.ADMIN:
                        this.props.history.push('/admin/meals');
                        break;
                    case Role.USER:
                        this.props.history.push('/user/menus');
                        break;
                    default:
                        break;
                }
            }, 400);
        }).catch(({ response })=>{
            this.setState({
                ...this.state,
                error: response,
                loading: false,
            });
        });
    }

    onChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render(){
        const { error, loading } = this.state
        cnst user = authenticated();
        if(user){
            switch(user.role){
                case Role.SUPER_ADMIN:
                case Role.ADMIN:
                    return <Redirect to="/admin/meals"/>
                case Role.USER:
                    return <Redirect to="/user/menu" />
                default:
                    break;
            }
        }

        return(
            <AuthPage styles={{ minHeight: '780px', height: '100vh'}} loading={loading}>
                <form
                   className='cl-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card' onSubmit={this.onSubmit}>
                     <h5 className='text-center mb-3 mt-4'>Login</h5>
                     {error && <Alert color="danger"> {singleError(error)} </Alert>}
                     <label>Email</label>
                     <input 
                        type="email"
                        className='form-control'
                        name='email'
                        onChange={this.onChange}/>
                    <label>Password</label>
                    <input 
                       type="password"
                       className='mb-3 form-control'
                       name='password'
                       onChange={this.onChange}/>
                    <Link className='mb-2' to="/request-password-reset">Forgot password?</Link>
                    <Button disabled={loading} className="btn btn-primary mt-2">Continue</Button>
                    <p className='text-center pt-3'>
                        <Link to="/sign-up">Create Account?</Link>
                    </p>
                   </form>
            </AuthPage>
        );
    }
}

export default Login;