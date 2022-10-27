import React from 'react';
import Loading from 'react-loading-bar';
import { NavLink, Redirect } from 'react-router-dom';
import Sidebar from 'src/components/common/Sidebar';
import Meals from 'src/components/views/admin/Meals';
import Menus from 'src/components/views/admin/Menus';
import Orders from 'src/components/views/admin/Orders';
import Users from 'src/components/views/admin/Users';
import OrdersHistory from 'src/components/views/admin/OrdersHistory';
import MenuModal from 'src/components/common/MenuModal';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { authenticated } from 'src/utils';
import { Role } from 'src/constants';

class Admin extends React.Component {

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

        if (user.role === Role.USER) {
            return <Redirect to="/user/menus" />;
        }

        const menu =  (
            <div>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/admin/meals" activeClassName="active">Manage Meals</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/admin/menus">Set Menu</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/admin/orders">Manage Orders</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/admin/users">Users</NavLink>
                <NavLink onClick={this.toggleMenu} 
                    className="btn" to="/admin/orders-history">Order History</NavLink>
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
                        <NavLink className="btn" to="/admin/meals" activeClassName="active">Manage Meals</NavLink>
                        <NavLink className="btn" to="/admin/menus">Set Menu</NavLink>
                        <NavLink className="btn" to="/admin/orders">Manage Orders</NavLink>
                        <NavLink className="btn" to="/admin/users">Users</NavLink>
                        <NavLink className="btn" to="/admin/orders-history">Order History</NavLink>
                    </Sidebar>
                    <Router>
                        <Switch>
                            <Route 
                                exact 
                                path="/admin/meals" 
                                render={() => <Meals toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                                    
                            <Route 
                                exact 
                                path="/admin/menus" 
                                render={() => <Menus toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />

                            <Route 
                                exact 
                                path="/admin/orders" 
                                render={() => <Orders toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />

                            <Route 
                                exact 
                                path="/admin/users" 
                                render={() => <Users toggleMenu={this.toggleMenu} {...this.props} setLoading={this.setLoading} /> } />

                            <Route 
                                exact 
                                path="/admin/orders-history" 
                                render={() => <OrdersHistory toggleMenu={this.toggleMenu} setLoading={this.setLoading} /> } />
                        </Switch>
                    </Router>
                 </section>
             </main>
        );
    }
}

export default Admin;