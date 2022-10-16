import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Sidebar = ({children, history}) => (
    <nav className="d-none d-md-block col-md-4 col-lg-3 controls sidebar patterns bg-teal text-center"> 
        <h1 className="logo-medium text-flav pt-3">BAM!</h1> 
        <hr/>
        {children}
        <hr className="last"/>
        <button onClick={() => {localStorage.clear(); history.push('/'); }} className="btn btn-logout">Logout</button>
    </nav>
);

Sidebar.propTypes = {
    children: PropTypes.array,
    history: PropTypes.object
};

export default Sidebar;