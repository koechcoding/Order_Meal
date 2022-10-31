import React from 'react';
import Loading from 'react-loading-bar';
import Menu from './Menu';
import Orders from './Orders';
import OrdersHistory from './OrdersHistory';
import Notifications from './Notifications';
import MenuModal from 'src/components/common/MenuModal';
import { NavLink, Redirect } from 'react-router-dom';
import Sidebar from 'src/components/common/Sidebar';
import { authenticated } from 'src/utils';
import { Role } from 'src/constants';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


class User extends React.Component {

    state = {
        loading: false
    }

    setLoading = (loading) => {
        this.setState({
            ...this.state,
            loading,
        });
    }

    toggleMenu = () => {
        this.setState({
            ...this.state,
            menuIsOpen: !this.state.menuIsOpen
        });
    }

    render() {
        const { loading, menuIsOpen } = this.state;
        const user = authenticated();
        if (! user) {
            return <Redirect to="/login" />;
        }

        if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
            return <Redirect to="/admin/meals" />;
        }
        const menu = (
            <div>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/user/menus" activeClassName="active">Today's Menu</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/user/orders">My Orders</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/user/notifications">Notifications</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/user/orders-history">Order History</NavLink>
            </div>
        );
        return (
            <main className="container-fluid">
                <Loading show={loading} color="orange" showSpinner={true}/>
                 <section className="row">
                    <MenuModal
                        {...this.props}
                        body={menu}
                        isOpen={menuIsOpen}
                        toggle={this.toggleMenu}
                    />
                    <Sidebar {...this.props}>
                        <NavLink className="btn" to="/user/menus" activeClassName="active">Today's Menu</NavLink>
                        <NavLink className="btn" to="/user/orders">My Orders</NavLink>
                        <NavLink className="btn" to="/user/notifications">Notifications</NavLink>
                        <NavLink className="btn" to="/user/orders-history">Order History</NavLink>
                    </Sidebar>
                    <Router>
                        <Switch>
                            <Route exact 
                                path="/user/menus" 
                                render={() => <Menu toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                            <Route 
                                exact 
                                path="/user/orders" 
                                render={() => <Orders toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                            <Route 
                                exact 
                                path="/user/orders-history" 
                                render={() => <OrdersHistory toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                            <Route 
                                exact 
                                path="/user/notifications" 
                                render={() => <Notifications toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                        </Switch>
                    </Router>
                 </section>
             </main>
        );
    }
}

export default User;