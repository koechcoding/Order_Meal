import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthPage from 'src/components/common/AuthPage';
import { Role } from 'src/constants';
import { authenticated } from 'src/constants';

class AccountCreated extends React.Component {

    render() {
        const user = authenticated();
        if(user){
            switch(user.role){
                case Role.SUPER_ADMIN:
                case Role.ADMIN:
                    return <Redirect to="/admin/meals" />
                case Role.USER:
                    return <Redirect to="/user/menu" />
                default:
                    break;
            }
        }

        return(
            <AuthPage styles={{minHeight: '500px', height: '100vh'}}>
                <div 
                  style={{ minHeight: '280px'}}
                  className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center card">

                    <h5 className='text-center mb-3 mt-4'>Account Created!</h5>
                    <p className='p-2'>Thank you for signing up with us!</p>
                    <p className='p-2'>To get started, please check your email to verify it and activate your account.</p>
                    <Link to='/login' className='btn btn-primary w-50 mx-auto'>Login</Link>
                  </div>
            </AuthPage>
        );
    }
}

export default AccountCreated;