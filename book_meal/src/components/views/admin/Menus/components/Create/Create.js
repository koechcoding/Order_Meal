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

    reset=()=>{
        this.setState({
            ...this.state,
            meal: "",
            menu: "",
        });
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
        })
    }

    onChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
}