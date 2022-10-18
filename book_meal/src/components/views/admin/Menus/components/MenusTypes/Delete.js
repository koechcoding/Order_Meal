
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
        const { menu ={}} = this.props;
        const { error } = this.state;
        const body = (
            <div>
                {error && 
                   <Alert className="text-center text-small" color="danger">
                       { singleError(error) }
                   </Alert>
                }
                <p className='text-center'>
                    Delete this menu (<b>{menu.name}</b>)?
                </p>
            </div>
        );
        const footer = (
            <Button color="danger" className="m-auto" onClick={this.onDelete}>Delete</Button>
        );

        return(
            <Modal
            {...this.props}
            title="Delete Menu"
            body={body}
            footer={footer}
            toggle={this.props.toggle}
        />
        );
    }
}

Delete.propTypes = {
    toggle: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    menu: PropTypes.object.isRequired
}

export default Delete;