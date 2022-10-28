import React from 'react';
import axios from 'src/axios';
import { Button, Alert } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { Role } from 'src/constants';

import AuthPage from 'src/components/common/AuthPage';
import { singleError, authenticated } from 'src/utils';

class PasswordReset extends React.Component {

    state = {}

    componentWillMount(){
        const { match } = this.props;
        const token = match? match.params.null : null;
        this.setState({
            ...this.state,
            token,
        });
    }

    onSubmit=(e)=>{
        e.preventDefault()
        this.setState({
            ...this.state,
            loading: true,
        });
        axios.put('auth/password-reset', this.state).then(({ data })=>{
            this.setState({
                ...this.state,
                success: true,
                loading: false,
            });
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
        const { error, success, loading } = this.state
        const user = authenticated();
        if(user){
            switch(user.role){
                case Role.SUPER_ADMIN:
                case Role.ADMIN:
                    return<Redirect to="/admin/meals" />;
                case Role.user:
                    return <Redirect to="/user/menu"/>
                default:
                    break;
            }
        }

        if(success){
            return(
                <AuthPage styles={{ minHeight: '500px', height: '100vh' }} loading={loading}>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card">
                    <h5 className="text-center mb-3 mt-4">Password Reset</h5>
                    <Alert color="success">
                        Password successfully reset. Please proceed to login.
                    </Alert>
                    <Link to="/login" className="btn btn-primary mt-2 mb-4">Login</Link>
                </form>
            </AuthPage>
            );
        }
        return(
            <AuthPage styles={{ minHeight: '500px', height: '100vh' }} loading={loading}>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                    onSubmit={this.onSubmit}>
                    <h5 className="text-center mb-3 mt-4">Password Reset</h5>
                    {error && <Alert color="danger"> {singleError(error)} </Alert>}
                    {success && 
                        <Alert color="danger">Password successfully</Alert>
                    }
                    <label>New Password </label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="password" 
                        onChange={this.onChange} />
                    <label>Confirm Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="password_confirmation" 
                        onChange={this.onChange} />
                    <Button disabled={loading} className="btn btn-primary mt-2 mb-4">Reset</Button>
                </form>
            </AuthPage>
        );
    }
}
export default PasswordReset;