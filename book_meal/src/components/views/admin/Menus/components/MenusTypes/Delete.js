
import React from 'react';
import axios from 'src/axios';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import Modal from 'src/components/common/Modal';
import { singleError } from 'src/utils';

class Delete extends React.Component {
    state={
        menu: {}
    }

    onDelete=()=>{
        this.props.setLoading(true);
        axios.delete('/menus/${this.props.menu.id}').then(()=>{
            this.setState({
                ...this.state,
                toDelete: null,
                deleteIsOpen: false,
            });
            this.props.setLoading(false);
            this.props.toggle();
            this.props.onChange();
        }).catch(({ response }) =>{
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        });
    }

    render(){
        
    }
}