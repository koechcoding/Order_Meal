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

class EditModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            quantity: 1,
        };
    }

    reset=()=>{
        setTimeout(()=>{
            this.setState({
                ...this.state,
                success: false,
                error: null
            });
        }, 2000);
    }

    onOpened=()=>{
        this.setState({
            ...this.state,
            error: null,
            success: false,
            menus: [],
            meals: [],
        });

        if(this.props){
            const { menuItem ={} } = this.props;
            let defaultValues = {
                meal: null,
                menu: null,
            }
            if(menuItem['meal.id']){
                defaultValues.meal ={
                    value: menuItem['meal.id'],
                    label: menuItem['meal.name']
                }
            }
            if (menuItem['menu.id']) {
                defaultValues.menu = {
                    value: menuItem['menu.id'], 
                    label: menuItem['menu.name']
                }
            }


            this.setState({
                ...this.state,
                ...defaultValues,
                quantity: menuItem.quantity,
            });
        }
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
    };