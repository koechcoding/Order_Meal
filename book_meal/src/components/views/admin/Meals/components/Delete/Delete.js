import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { singleError } from 'src/utils';

class DeleteModal extends React.Component {
     
    state = {}

    onOpened=()=>{
        this.setState({
            ...this.state,
            error: null,
        });
    }

    onDelete=()=>{
        axios.delete('/meals/${this.props.meal.id}').then(()=>{
            this.props.onChange();
            this.props.toggle();
        }).catch(({ response})=>{
            this.setState({
                ...this.state,
                error: response,
            });
        })
    }

    render(){
        const meal = this.props.meal || {}
        const { error} = this.state;
        const bpdy = (
            <div>
              {error &&
              <Alert className="text-center text-small" color="danger">
                 { singleError(error) }  
              </Alert>
              }
              <p className='text-center'>
                Delete this meal (<b>{meal.name}</b>)?
              </p>
            </div>
        );

        const footer =(
            <Button color="danger" className="m-auto" onClick={this.onDelete}>Delete</Button>
        );

        const { isOpen, toggle } = this.props;
        return(
            <Modal
               title="Delete Meal"
               body={body}
               footer={footer}
               isOpen={isOpen}
               toggle={toggle}
               onOpened={this.onOpened}
            />
        );
    }
}

DeleteModal.propTypes = {
    meal: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
}

export default DeleteModal;