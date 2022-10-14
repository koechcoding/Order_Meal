import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import './styles.css';

const AuthPage = ({ styles = {}, children, loading}) =>(
    <main style={{...styles}} className="patterns bg-teal">
        <Loading show={loading} color="orange"/>
        <section className='container login'>
            <div className='row pt-5'>
                <div className='col-12 text-center'>
                    <h1 className='logo-small text-flav'>BAM!</h1>
                </div>
            </div>
            <div className='row mb-5 pl-3 pr-3 p-sm-0'>
                {children}
            </div>
        </section>
    </main>
);

AuthPage.propTypes = {
    children: PropTypes.element,
    loading: PropTypes.bool,
}

export default AuthPage;