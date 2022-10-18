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
                
            }
        }
    }
}