import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ImageInput extends React.Component {
    constructor(props){
        super(props);
        let prefillSelected = false;
        if(props.prefill && props.prefill !== '#'){
            prefillSelected = true;
        }
        this.state = {
            size: 1,
            fileName: '',
            fileSize: '',
            fileModified: '',
            imageSelected: false,
            prefillSelected,
        }
        this.canvasRef = React.createRef();
        this.containerRef = React.createRef();
        this.fileInputRef = React.createRef();
    }
    onRemove =(e)=>{
        this.setState({
            ...this.state,
            fileName: '';
            fileSize: '',
            fileModified: '',
            imageSelected: false,
        });
        this.fileInputRef.current.value = '';
        this.props
    }
}