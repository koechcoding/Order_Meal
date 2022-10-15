import React from 'react';
import PropType from 'prop-types';
import {
    Modal as BModal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import './styles.css';

const MenuModal = ({ onOpened, body, isOpen, toggle, history}) =>(
    <BModal classname="menu-modal" isOpen={isOpen} onOpened={onOpened} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>
            <button onClick={()=>toggle()} type="button" className="close">
                <span aria-hidden="true">&{times}</span>
            </button>
            <h2 className="logo-medium text-flav pt-3">BAM!</h2>
        </ModalHeader>
        <ModalBody>
            {body}
            <button onClick={()=>{ localStorage.clear(); history.push('/');}} className="btn btn-logout">Logout</button>
        </ModalBody>
    </BModal>
);

MenuModal.propTypes = {
    onOpened: PropTypes.func,
    body: PropTypes.element,
    isOpen: PropTypes.bool,
    history: PropTypes.object,
    toggle: PropTypes.func.isRequired,
}

export default MenuModal;