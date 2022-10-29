import React from 'react';
import axios from 'src/axios';
import { Alert } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import AuthPage from 'src/components/common/AuthPage';
import { Role } from 'src/constants';
import { authenticated, singleError } from 'src/utils';

class VerifyMail extends React.Component {

    state = {}

    componentWillMount() {
        const { match } = this.props;
        const token = match ? match.params.token : null;
        if (token) {
            this.setState({
                ...this.state,
                token,
            });
            axios.post('auth/verify-email', { token }).then(({ data }) => {
                this.setState({
                    ...this.state,
                    success: true,
                })
            }).catch(({ response }) => {
                this.setState({
                    ...this.state,
                    error: response
                });
            })
        } else {
            this.setState({
                ...this.state,
                error: {
                    message: 'Email verification token is required!'
                }
            });
        }
    }

    render() {
        const { error, success } = this.state;
        const user = authenticated();
        if (user) {
            switch(user.role) {
                case Role.SUPER_ADMIN:
                case Role.ADMIN:
                    return <Redirect to="/admin/meals" />;
                case Role.USER:
                    return <Redirect to="/user/menu" />;
                default:
                    break;
            }
        }

        let loading = false;
        if (! error && ! success) 
            loading = true;

        return (
            <AuthPage styles={{ minHeight: '500px', height: '100vh' }} loading={loading}>
                <div 
                    style={{ minHeight: '280px' }}
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center card">

                    <h5 className="text-center mb-3 mt-4">Email Verification.</h5>
                    {error && 
                            <div>
                                <Alert color="danger"> {singleError(error)} </Alert>
                                <p className="p-2">
                                    An error occured while verifying your email account,
                                    please try again.
                                </p>
                            </div>
                    }
                    {success && 
                        <div>
                            <Alert color="success">
                                Verification successful!
                            </Alert>
                            <p className="p-2">
                                You have successfully verified your email address.
                                Please proceed to login.
                            </p>
                            <Link to='/login' className="btn btn-primary w-50 mx-auto">Login</Link>
                        </div>
                    }

                    {!error && !success &&
                        <p className="p-2">
                            Verifying your email address...
                        </p>
                    }
                </div>
            </AuthPage>
        );
    }
}

export default VerifyMail;