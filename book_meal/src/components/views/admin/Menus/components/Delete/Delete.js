import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { singleError } from 'src/utils';


class DeleteModal extends React.Component {
    state = {}

    onOpened =()=>{
        this.setState({
            ...this.state,
            error: null,
        });
    }

    onDelete=()=>{
        axios.delete('/menu-items/${this.props.menuItem.id}').then(()=>{
            this.props.onChange();
            this.props.toggle();
        }).catch(({ response }) =>{
            this.setState({
                ...this.state,
                error: response,
            })
        })
    }

    render(){
        const { error } = this.state;
        const { menuItem ={}} = this.props;
        const body = (
            <div>
            {error &&
                <Alert className="text-center text-small" color="danger">
                    { singleError(error) }
                </Alert>
            }
                <p className="text-center">
                    Delete this menu item (ID: <b>{menuItem.id}</b>)?
                </p>
        </div>
       );

       const footer =(
        <Button color="danger" className="m-auto" onClick={this.onDelete}>Delete</Button>
       );

       const { isOpen, toggle } = this.props;
       return (
        <Modal
           title="Delete Menu Item"
           body={body}
           footer={footer}
           isOpen={isOpen}
           toggle={toggle}
           onOpened={this.onOpened}
        />
       );
    }
}
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    menuItem: PropTypes.object.isRequired,
}

export default DeleteModal;