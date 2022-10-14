import React from 'react';
import PropTypes from 'prop-types';
import menuImg from './assets/menu.png';

const Content = ({ children, contentTop, contentFilter, toggleMnu })=>(
    <div className="col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3 container-fluid p-4">
        <div className='row'>
            <div className='col-12'>
                <img className='d-md-none controls-icon pb-3'
                   onClick={toggleMenu}
                   alt="Menu"
                   src={menuImg}/>
            </div>
            {content Top}
        </div>
        {contentFilter}
        <div className="row">
            <div className='col-12'>
                {children}
            </div>
        </div>
    </div>
);

Content.propTypes = {
    children: PropTypes.array,
    contentTop: PropTypes.element,
    contentFilter: PropTypes.element,
    toggleMenu: PropTypes.func.isRequired,
};

export default Content;