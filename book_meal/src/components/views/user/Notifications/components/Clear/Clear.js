import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { singleError } from 'src/utils';


class ClearModal extends React.Component {

    state = {
        quantity: 1
    }

    reset = () => {
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
        });
    }

    onClear = () => {
        this.props.setLoading(true); 
        axios.delete('notifications').then(() => {
            this.props.setLoading(false);
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response
            });
            this.props.setLoading(false);
            this.reset();
        });
    }

    render() {
        const { error, success } = this.state;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                {success &&
                    <Alert className="text-center text-small" color="success">
                        Successfully deleted.
                    </Alert>
                }
                <p className="text-center">
                    Clear all notifications?
                </p>
            </div>
        );

        const footer = (
            <Button color="danger" className="m-auto" onClick={this.onClear}>Clear</Button>
        );

        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                {...this.props}
                title="Clear All Notifications" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

ClearModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    setLoading: PropTypes.func.isRequired,
}

export default ClearModal;