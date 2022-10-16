import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import { singleError } from 'src/utils';
import Modal from 'src/components/common/Modal';
import { Alert, Input, Button } from 'reactstrap';
import ImageInput from 'src/components/common/ImageInput';
import { IMAGES_UPLOAD_URL, IMAGE_UPLOAD_PRESET } from 'src/constants';

class CreateModal extends React.Component {

    state = {
        name: '',
        cost: '',
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

    onImageAdded = (data) => {
        this.setState({
            ...this.state,
            image: data,
        });
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
            success: false,
            image: null,
        });
    }

    onImageRemoved = () => {
        this.setState({
            ...this.state,
            image: null,
        });
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onCreate = () => {
        // on success...
        const resolve = () => {
            // reset headers
            axios.auth();
            this.setState({
                ...this.state,
                success: true,
                error: null,
                name: '',
                cost: '',
                image: null,
            });
            this.props.onChange();
            this.reset();
        }

        // on failure...
        const reject = (response) => {
            this.setState({
                ...this.state,
                error: response,
                success: false,
            });
            this.reset();
            this.props.setLoading(false);
        }
        this.props.setLoading(true);

        const { image, name, cost } = this.state;
        if (image) {
            const imageUpload = {
                file: image,
                upload_preset: IMAGE_UPLOAD_PRESET
            };

            // first upload the image
            delete axios.defaults.headers.common.Authorization;
            delete axios.defaults.headers.common['Access-Control-Allow-Origin'];
            axios.post(IMAGES_UPLOAD_URL, imageUpload).then(({ data }) => {
                axios.auth();
                axios.post('/meals', { 
                    name, 
                    cost, 
                    img_url: data.secure_url 
                }).then(() => {
                    resolve();
                }).catch(({ response }) => {
                    reject(response)
                });

            }).catch(({ response }) => {
                reject(response);
            });
        } else {
            axios.post('/meals', { name, cost }).then(() => {
                resolve();
            }).catch(({ response }) => {
                reject(response);
            })
        }
    }

    render() {
        const { error, success } = this.state;
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

                <ImageInput 
                    onImageAdded={this.onImageAdded} 
                    onImageRemoved={this.onImageRemoved}
                />
                <div className="pl-4 pr-4">
                    <label> Name </label>
                    <Input name="name" value={this.state.name} onChange={this.onChange} type="text" />
                    <label> Cost </label>
                    <Input name="cost" value={this.state.cost} onChange={this.onChange} type="number" />
                </div>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto"onClick={this.onCreate}>Save Meal</Button>
        )
        const { isOpen, toggle } = this.props;

        return (
            <Modal 
                title="Add New Meal" 
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
    toggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,

}

export default CreateModal;