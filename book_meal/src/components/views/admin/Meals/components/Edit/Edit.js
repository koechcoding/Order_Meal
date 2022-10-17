import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import ImageInput from 'src/components/common/ImageInput';
import { Alert, Input, Button } from 'reactstrap';
import { singleError } from 'src/utils';
import { IMAGES_UPLOAD_URL, IMAGE_UPLOAD_PRESET } from 'src/constants';

class EditModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ...props.meal
        }
    }

    onImageAdded=(data)=>{
        this.setState({
            ...this.state,
            image: data,
        });
    }

    onImageRemoved=()=>{
        this.setState({
            ...this.state,
            image: null,
        });
    }

    onPrefillRemoved=()=>{
        this.setState({
            ...this.state,
            image: null,
            img_url: "#",
        });
    }

    onOpened=()=>{
        this.setState({
            ...this.state,
            error: null,
            success: false,
            image: null,
        });
    }
}