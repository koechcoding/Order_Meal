import React from 'react';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { Role } from 'src/constants';
import { authenticated, singleError } from 'src/utils';


class ManageModal extends React.Component {

    state = {}

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
        });
    }

    onSetRole = (role) => {
        const { user } = this.props;
        let newUser = {
            ...user,
            role,
        }
        const authUser = authenticated();
        this.props.setLoading(true);
        axios.put(`users/${user.id}`, newUser).then(() => {

            if (authUser.id === user.id) {
                localStorage.clear();
                this.props.setLoading(false);
                setTimeout(() => {
                    this.props.history.push('/login');
                    this.props.toggle();
                }, 1000);
            } else {
                this.props.toggle();
                this.props.setLoading(false);
                this.props.onChange();
            }
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        });
    }

    render() {
        const { error } = this.state;
        const { user = {} } = this.props;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                {user.role === Role.ADMIN &&
                    <p className="text-center">
                        Demote this user?
                    </p>
                }
                {user.role === Role.USER &&
                    <p className="text-center">
                        Make this user an admin?
                    </p>
                }
                {user.role === Role.SUPER_ADMIN &&
                    <p className="text-center text-danger">
                        You cannot demote this admin.
                    </p>
                }
            </div>
        );

        const footer = (
            <div className="m-auto">
                {user.role === Role.ADMIN &&
                        <Button 
                            color="danger" 
                            onClick={() => this.onSetRole(Role.USER)} 
                        >
                            Demote
                        </Button>
                }
                {user.role === Role.USER &&
                        <Button 
                            color="primary" 
                            onClick={() => this.onSetRole(Role.ADMIN)} 
                        >
                            Promote
                        </Button>
                }
            </div>
        );

        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                title="Manage User" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

export default ManageModal;