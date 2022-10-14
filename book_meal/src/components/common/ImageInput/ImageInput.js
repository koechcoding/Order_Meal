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
        this.props.onImageRemoved();
    }
    onRemovePrefill= (e)=>{
        this.setState({
            ...this.state,
            fileName: '',
            fileSize: '',
            fileModified: '',
            imageSelected: false,
            prefillSelected: false,
        });
        this.props.onPrefillRemoved();
    }
    onSelectImage = (e)=>{
        this.fileInputRef.current.click();
    }

    onFileChange =(e)=>{
        const files = e.target.files
        if(!files.length){
            return
        }
        const {
            size,
            fileName,
            fileSize,
            fileModified
        } = this.state;
        if(files[0].size <= 0 || files[0].size > size *1024 * 1024){
            this.setState({
                ...this.state,
                error: 'Image file is too large. Please select a smaller image'
            });
            return
        }
       
        //if not unique file return
        if(files[0].name === fileName && files[0].size === fileSize && fileModified === files[0].lastModified){
            return
        }
        //ensure received file is image
        if(files[0].type.substr(0, 6) !== 'image/'){
            return
        }

        this.setState({
            ...this.state,
            file: files[0],
            fileName: files[0].name,
            fileSize: files[0].size,
            fileModified: files[0].lastModified,
            fileType: files[0].type,
            imageSelected: true,
        });
        this.loadImage(files[0]);
    }
}