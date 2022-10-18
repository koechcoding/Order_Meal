import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button, Input } from 'reactstrap';
import { singleError } from 'src/utils';
import { Async } from 'react-select';
import _ from 'lodash';

import 'react-select/dist/react-select.css';
import './styles.css';

class CreateModal extends React.Component {

    state = {
        quantity: 1,
    }

    reset = () => {
        this.setState({
            ...this.state,
            meal: '',
            menu: '',
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                success: false,
                error: null
            });
        }, 2000);
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
            success: false,
            menus: [],
            meals: [],
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    fetchMenus = (input, callback) => {
        axios.get(`/menus?search=${input}&per_page=5`).then(({ data }) => {
            const menus = data.menus.map((menu) => {
                return { value: menu.id, label: menu.name }
            });
            callback(null, { options: menus });
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response
            });
            callback(response, null);
        });
    }

    fetchMeals = (input, callback) => {
        axios.get(`/meals?search=name:${input}&per_page=5`).then(({ data }) => {
            const meals = data.meals.map((meal) => {
                return { value: meal.id, label: meal.name }
            });
            callback(null, { options: meals });
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response
            });
            callback(response, null);
        });
    }

    setSelectedMenu = (menu) => {
        this.setState({
            ...this.state,
            menu
        });
    }

    setSelectedMeal = (meal) => {
        this.setState({
            ...this.state,
            meal
        })
    }

    onCreate = () => {
        this.props.setLoading(true);

        const { meal = {}, menu = {} } = this.state;
        console.log(menu);
        const menuItem = {
            meal_id: meal.value ? meal.value : '',
            menu_id: menu.value ? menu.value : '',
            quantity: this.state.quantity,
        };

        axios.post('/menu-items', menuItem).then(({ data }) => {
            this.props.onChange();
            this.setState({
                ...this.state,
                success: true,
                error: null,
            });
            this.reset();
            this.props.setLoading(false);
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
                success: false,
            });
            this.reset();
            this.props.setLoading(false);
        });
    }

    render() {
        const { error, success, } = this.state;
        const body = (
            <div>
                {success &&
                    <Alert className="text-center text-small" color="success">
                        Successfully added
                    </Alert>
                }
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <div className="pl-4 pr-4">
                    <label> Meal Name </label>
                    <Async 
                        name="meal"
                        value={this.state.meal}
                        onChange={this.setSelectedMeal}
                        loadOptions={_.throttle(this.fetchMeals, 500)}
                        fitlerOptions={(options) => { return options; }}
                    />
                    <label className="mt-3"> Select Menu </label>
                    <Async 
                        name="menu"
                        value={this.state.menu}
                        onChange={this.setSelectedMenu}
                        loadOptions={_.throttle(this.fetchMenus, 500)}
                        fitlerOptions={(options) => { return options; }}
                    />
                    <label className="mt-3">Quantity</label>
                    <Input name="quantity" value={this.state.quantity} onChange={this.onChange} type="text" />
                </div>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto"onClick={this.onCreate}>Save Item</Button>
        )
        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                title="Add Meal To Menu" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

CreateModal.propTypes = {
    setLoading: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
}

export default CreateModal;