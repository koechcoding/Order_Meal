import React from 'react';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'src/axios';

import AuthPage from '../../../common/AuthPage';
import { singleError } from '../../../../utils';

class Register extends React.Component {

    state = {}

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            loading: true,
        })
        axios.post('auth/signup', this.state).then(({ data }) => {
            this.props.history.push('/account-created');
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
                loading: false,
            })
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { loading, error } = this.state;

        return (
            <AuthPage styles={{ minHeight: '780px', height: '100vh' }} loading={loading}>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                    onSubmit={this.onSubmit}>

                    <h5 className="text-center mb-3 mt-4">Create An Account</h5>
                    {error && <Alert color="danger"> {singleError(error)} </Alert>}
                    <label>Username</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="username" 
                        onChange={this.onChange} />
                    <label>Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        name="email" 
                        onChange={this.onChange} />
                    <label>Password </label>
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
                    <Button disabled={loading} className="btn btn-primary mt-2">Sign Up</Button>
                    <p className="text-center pt-3"> 
                        <Link to="/login">Login?</Link>
                    </p>
                </form>
            </AuthPage>
        );
    }
}

export default Register;