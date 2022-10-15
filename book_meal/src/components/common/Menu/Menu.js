import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './components/MenuItem';

const Menu = ({ items, menu = {}, onOrder }) => (
    <div>
        <h5 className="text-center mt-2">{menu.name}</h5>
        <div className="row">
            {items.map(item => <MenuItem menu={menu} item={item} key={item.id} onOrder={onOrder} />)}
        </div>
    </div>
);

Menu.propTypes = {
    items: PropTypes.array,
    menu: PropTypes.object,
    onOrder: PropTypes.func.isRequired
}

export default Menu;