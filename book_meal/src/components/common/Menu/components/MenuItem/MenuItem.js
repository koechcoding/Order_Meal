import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import placeholder from './assets/placeholder.png';

const MenuItem = ({ menu, item, onOrder})=>(
    <div className="col-10 offset-1 offset-sm-0 col-sm-6 col-md-4 col-lg-3 text-center">
        <div className='menu-item pt-3 pl-3 pr-3 m-1'>
            <img onScroll={(!item.meal.img.url || item.meal.img.url === '#')? placeholder : item.meal.img_url} className="img-fluid" alt="Food"/>
            <table className='table'>
                <tbody>
                    <tr>
                        <td className='p-2'>Ksh.{item.meal.cost}</td>
                    </tr>
                    <tr>
                        <td className='p-2'>{item.meal.name}</td>
                    </tr>
                    <tr>
                        <td className='pb-0'>
                            <button
                               className='btn btn-primary'
                               onClick={()=>onOrder(item, menu)}>
                                Order Now
                               </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

MenuItem.propTypes ={
    menu: PropTypes.object,
    item: PropTypes.object,
    onOrder: PropTypes.func.isRequired,
};

export default MenuItem;