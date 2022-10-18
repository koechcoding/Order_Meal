import React from 'react';
import axios from 'src/axios';
import PropTypes from 'prop-types';
import { Alert, Button, Input } from 'reactstrap';
import Modal from 'src/components/common/Modal';
import DeleteModal from './Delete';
import EditModal from './Edit';
import { singleError } from 'src/utils';

class MenuTypes extends React.Component {

    state = {
        newName: '',
        toEdit: {},
        toDelete: {},
        data: {
            menus: []
        },
    }

    componentWillMount() {
        this.fetchMenuTypes();
    }

    fetchMenuTypes = () => {
        this.props.setLoading(true);
        axios.get('/menus?fields=name,id&per_page=1000').then(({ data }) => {
            this.setState({
                ...this.state,
                data,
            });
            this.props.setLoading(false);
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        })
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
        })
    }

    onDelete = (menu) => {
        this.setState({
            ...this.state,
            deleteIsOpen: true,
            toDelete: menu,
        });
    }
    
    onEdit = (menu) => {
        this.setState({
            ...this.state,
            editIsOpen: true,
            toEdit: menu,
        });
    }

    toggleEdit = () => {
        this.setState({
            ...this.state,
            editIsOpen: !this.state.editIsOpen
        });
    }

    toggleDelete = () => {
        this.setState({
            ...this.state,
            deleteIsOpen: !this.state.deleteIsOpen
        });
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onCreate = () => {
        this.props.setLoading(true);
        axios.post('/menus', { name: this.state.newName }).then(({ data }) => {
            this.setState({
                ...this.state,
                error: null,
                newName: ''
            });
            this.props.setLoading(false);
            this.fetchMenuTypes();
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response
            });
            this.props.setLoading(false);
        })
    }

    render() {
        const { data, error } = this.state;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <div className="container m-0 p-0">
                    <div className="row m-0 p-0">
                        <div className="col-4 text-right pr-1">
                            <label className="pt-2">Create New:</label>
                        </div>
                        <div className="col-4 pr-1 pl-0">
                            <Input 
                                name="newName"
                                value={this.state.newName} 
                                onChange={this.onChange} 
                                placeholder="Name..." type="text" />
                        </div>
                        <div className="col-4 pl-0">
                            <Button onClick={this.onCreate} color="secondary">Add</Button>
                        </div>
                    </div>
                </div>
                <div className="table-holder" style={{ maxHeight: '350px' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.menus.map((menu) => (
                                <tr key={menu.id}>
                                    <td>{menu.id}</td>
                                    <td>{menu.name}</td>
                                    <td><button onClick={() => this.onEdit(menu)} className="edit-act">Edit</button></td>
                                    <td><button onClick={() => this.onDelete(menu)} className="delete-act">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

        const { isOpen, toggle, } = this.props;
        const { 
            toEdit,
            editIsOpen,
            toDelete, 
            deleteIsOpen 
        } = this.state;
        return (
            <div>
                <Modal 
                    size="lg"
                    title="Manage Menus" 
                    body={body} 
                    isOpen={isOpen}
                    toggle={toggle}
                    onOpened={this.onOpened}
                />
                <DeleteModal
                    {...this.props}
                    menu={toDelete}
                    isOpen={deleteIsOpen}
                    toggle={this.toggleDelete}
                    onChange={this.fetchMenuTypes}
                />
                <EditModal
                    {...this.props}
                    menu={toEdit}
                    isOpen={editIsOpen}
                    toggle={this.toggleEdit}
                    onChange={this.fetchMenuTypes}
                />
            </div>
        );
    }
}

MenuTypes.propTypes = {
    setLoading: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
}


export default MenuTypes;