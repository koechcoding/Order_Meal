import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './styles.css';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.inputRef = React.createRef();
    }

    onReset = (e) => {
        this.setState({
            ...this.state,
            text: '',
        });
        this.inputRef.current.value = '';
        this.props.onFilter('')
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            text: e.target.value
        });
        this.props.onFilter(e.target.value)
    }

    render() {
        return (
            <div className="row mb-3">
                <div className="col-3 col-sm-2 col-lg-1 text-right">
                    <label className="pt-2">Text:</label>
                </div>
                <div className="col-9 col-sm-7 col-lg-4 col-xl-3 pl-0 pr-1">
                    <input 
                        ref={this.inputRef} 
                        onChange={_.throttle(this.onChange, 500)} 
                        type="text" 
                        className="d-inline form-control ml-0 mb-0"  placeholder="Type to filter..."/>
                </div>
                {this.state.text &&
                    <div className="animated fadeIn btn-reset col-12 col-sm-1 col-lg-1 pt-3 pt-sm-0 pl-0">
                        <button onClick={this.onReset} className="btn btn-secondary d-block m-auto">Reset </button>
                    </div>
                }
            </div>
        );
    }
};

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default Filter;