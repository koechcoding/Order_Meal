import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import ImageInput from 'src/components/common/ImageInput';
import { Alert, Input, Button } from 'reactstrap';
import { singleError } from 'src/utils';
import { IMAGES_UPLOAD_URL, IMAGE_UPLOAD_PRESET } from 'src/constants';


class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.meal
        }
    }

    onImageAdded = (data) => {
        this.setState({
            ...this.state,
            image: data,
        });
    }

    onImageRemoved = () => {
        this.setState({
            ...this.state,
            image: null,
        })
    }

    onPrefillRemoved = () => {
        this.setState({
            ...this.state,
            image: null,
            img_url: '#',
        });
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
            success: false,
            image: null,
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onEdit = () => {
        // on success...
        const resolve = () => {
            this.setState({
                ...this.state,
                success: true,
                error: null,
                image: null,
            });
            this.props.onChange();
            this.props.setLoading(false);
            setTimeout(this.props.toggle, 1000);
        }

        // on failure...
        const reject = (response) => {
            this.setState({
                ...this.state,
                error: response,
                success: false,
            });
            this.props.setLoading(false);
        }

        this.props.setLoading(true);

        const { image, name, cost, img_url } = this.state;
        if (image) {
            const imageUpload = {
                file: image,
                upload_preset: IMAGE_UPLOAD_PRESET
            };

            // delete auth headers..
            delete axios.defaults.headers.common.Authorization;
            delete axios.defaults.headers.common['Access-Control-Allow-Origin'];
            // image upload...
            axios.post(IMAGES_UPLOAD_URL, imageUpload).then(({ data }) => {
                axios.auth();
                axios.put(`/meals/${this.props.meal.id}`, { 
                    name, 
                    cost, 
                    img_url: data.secure_url 
                }).then(() => {
                    resolve();
                }).catch(({ response }) => {
                    reject(response)
                });

            }).catch(({ response }) => {
                // restore headers
                axios.auth();
                reject(response);
            });
        } else {
            axios.put(`/meals/${this.props.meal.id}`, { name, cost, img_url }).then(() => {
                resolve();
            }).catch(({ response }) => {
                reject(response);
            })
        }
    }

    render() {
        const { error, success } = this.state;
        const meal = this.props.meal || {}
        const body = (
            <div>
                {success &&
                        <Alert className="text-center text-small" color="success">
                            Successfully edited meal.
                        </Alert>
                }
                {error &&
                        <Alert className="text-center text-small" color="danger">
                            { singleError(error) }
                        </Alert>
                }

                <ImageInput 
                    prefill={meal.img_url}
                    onImageAdded={this.onImageAdded} 
                    onImageRemoved={this.onImageRemoved}
                    onPrefillRemoved={this.onPrefillRemoved}
                />
                <div className="pl-4 pr-4">
                    <label> Name </label>
                    <Input defaultValue={meal.name} name="name" onChange={this.onChange} type="text" />
                    <label> Cost </label>
                    <Input defaultValue={meal.cost} name="cost" onChange={this.onChange} type="number" />
                </div>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto" onClick={this.onEdit}>Update Meal</Button>
        )
        const { isOpen, toggle } = this.props;

        return (
            <Modal 
                title="Edit Meal" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

EditModal.propTypes = {
    meal: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
}

export default EditModal;