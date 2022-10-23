import React from 'reacxt';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { Role } from 'src/constants';
import { authenticated, singleError } from 'src/utils';

class ManageModal extends React.Component {

    state = {}

    onOpened =()=>{
        this.setState({
            ...this.state,
            error: null,
        });
    }

    onSetRole=(role)=>{
        const { user } = this.props;
        let newUser = {
            ...user,
            role,
        }
        const authUser = authenticated();
        this.props.setLoading(true);
        axios.put('users/${user.id', newUser).then(()=>{

            if(authUser.id === user.id){
                localStorage.clear();
                this.props.setLoading(false);
                setTimeout(()=>{
                    this.props.history.push('/login');
                    this.props.toggle();
                }, 1000);
            } else{
                this.props.toggle();
                this.props.setLoading(false);
                this.props.onChange();
            }
        }).catch(({ response }) =>{
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        });
    }
}