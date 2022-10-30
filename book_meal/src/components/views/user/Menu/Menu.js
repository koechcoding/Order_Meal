import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Content from 'src/components/common/Content';
import MealMenu from 'src/components/common/Menu';
import OrderModal from './components/Order';

class Menu extends React.Component {

    state = {
        data: {},
        currentMenu: 0,
    }

    componentWillMount() {
        this.fetchMenus();
    }

    fetchMenus = () => {
        this.props.setLoading(true);
        axios.get('/menus?time=all').then(({ data }) => {
            this.setState({
                ...this.state,
                data
            });
            this.props.setLoading(false);
        }).catch(({ response }) =>  {
            this.props.setLoading(false);
        })
    }

    toggleOrder = () => {
        this.setState({
            ...this.state,
            orderIsOpen: !this.state.orderIsOpen
        });
    }

    onOrder = (item, menu) => {
        this.setState({
            ...this.state,
            toOrder: item,
            orderMenu: menu,
            orderIsOpen: !this.state.orderIsOpen
        });
    }

    onFilter = (e) => {
        this.setState({
            ...this.state,
            currentMenu: Number(e.target.value)
        });
    }

    onReset = () => {
        this.setState({
            ...this.state,
            currentMenu: 0
        })
    }

    render() {
        let { menus = [] } = this.state.data;
        const { toOrder, orderMenu, orderIsOpen, currentMenu } = this.state;

        let filtered = menus.filter((menu) => {
            if (currentMenu === 0) {
                return true;
            }
            return menu.id === currentMenu;
        });

        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Today's Menu</h5>
            </div>
        );

        const contentFilter = (
            <div className="row mb-3">
                <div className="col-3 col-sm-2 col-lg-1 text-right">
                    <label className="pt-2">Menu:</label>
                </div>
                <div className="col-9 col-sm-7 col-lg-4 col-xl-3 pl-0 pr-1">
                    <select onChange={this.onFilter} className="form-control">
                        <option value="0">-- All --</option>
                        {menus.map((menu) => (
                            <option key={menu.id} value={menu.id}>{menu.name}</option>
                        ))}
                    </select>
                </div>
                {currentMenu !== 0 &&
                    <div className="animated fadeIn btn-reset col-12 col-sm-1 col-lg-1 pt-3 pt-sm-0 pl-0">
                        <button onClick={this.onReset} className="btn btn-secondary d-block m-auto">Reset </button>
                    </div>
                }
            </div>
        );

        return (
            <Content 
                {...this.props}
                contentTop={contentTop} 
                contentFilter={contentFilter}>
                {filtered.map((menu) => 
                    <MealMenu 
                        menu={menu}
                        key={menu.id} 
                        onOrder={this.onOrder}
                        items={menu.menu_items} 
                    />)
                }
                <OrderModal 
                    {...this.props}
                    size="sm"
                    item={toOrder} 
                    menu={orderMenu}
                    isOpen={orderIsOpen} 
                    toggle={this.toggleOrder}/>

            </Content>
        );
    }
}

Menu.propTypes = {
    setLoading: PropTypes.func.isRequired
}

export default Menu;