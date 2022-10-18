
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import { Alert, Button, Input } from 'reactstrap';
import Modal from 'src/components/common/Modal';
import { singleError } from 'src/utils';

class Edit extends React.Component {

    state = { name: '' }

    onEdit = () => {
        this.props.setLoading(true);
        axios.put(`/menus/${this.props.menu.id}`, {name: this.state.name}).then(() => {
            this.props.setLoading(false);
            this.props.toggle();
            this.props.onChange();
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        });
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { error } = this.state;
        const { menu = {} } = this.props;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <p>
                    <label>Name</label>
                    <Input 
                        name="name" 
                        defaultValue={menu.name} 
                        onChange={this.onChange}/>
                </p>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto" onClick={this.onEdit}>Update</Button>
        );

        return (
            <Modal
                {...this.props}
                title="Edit Menu"
                body={body}
                footer={footer}
                toggle={this.props.toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

Edit.propTypes = {
    toggle: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    menu: PropTypes.object.isRequired
}

export default Edit;