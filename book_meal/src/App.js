import React from 'react';
import User from 'src/components/views/user';
import Admin from 'src/components/views/admin';
import Landing from 'src/components/views/Landing';
import Login from 'src/components/views/auth/Login';
import Register from 'src/components/views/auth/Register';
import VerifyEmail from 'src/components/views/auth/VerifyEmail';
import AccountCreated from 'src/components/views/auth/AccountCreated';
import RequestPasswordReset from 'src/components/views/auth/RequestPasswordReset';
import PasswordReset from 'src/components/views/auth/PasswordReset';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './styles.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/user" component={User} />
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={Register} />
                    <Route path="/account-created" component={AccountCreated} />
                    <Route path="/verify-email/:token" component={VerifyEmail} />
                    <Route path="/request-password-reset" component={RequestPasswordReset} />
                    <Route path="/password-reset/:token" component={PasswordReset} />
                </Switch>
            </Router>
        );
    }
}

export default App;