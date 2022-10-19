import React from 'react';
import PropTypes from 'prop-types';
import { Alert, 
    ButtonDropdown,  
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import MenusTable from './components/MenusTable';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';
import MenuTypes from './components/MenuTypes';
import axios from 'src/axios';
import './styles.css';

import { singleError, paginationInfo } from 'src/utils';


class Menus extends React.Component {

    bubbleBlocked = false;

    constructor(props){
        super(props);
        this.state = {
            page: 1,
            data: {},
            search: '',
            perPage: 5,
            deleteIsOpen: false,
            editIsOpen: false,
            menuTypesIsOpen: false,
            toDelete: {},
            toEdit: {}
        }
    }
    componentWillMount() {
        this.fetchMenus()
    }

    fetchMenus = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        const link = `/menu-items?page=${page}&search=${search}&per_page=${perPage}&time=today`;
        this.props.setLoading(true);

        axios.auth();
        axios.get(link, this.state).then(({ data }) => {
            const pageInfo = paginationInfo(data);
            this.setState({
                ...this.state,
                page: pageInfo.currentPage,
                data,
            });
            this.props.setLoading(false);

            if (pageInfo.currentCount === 0 && pageInfo.currentPage !== 1) {
                this.fetchMenus({
                    page: pageInfo.currentPage - 1
                })
            }
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            })
            this.props.setLoading(false);
        })
    }

    blockBubbling = () => {
        /** 
         * workaround e.stopPropagation()
         * @see https://github.com/facebook/react/issues/1691
         */
        this.bubbleBlocked = true;
        setTimeout(() => {
            this.bubbleBlocked = false;
        }, 500);

    }
    toggleMenuTypes = (e) => {
        this.blockBubbling();
        this.setState({
            ...this.state,
            manageIsOpen: false,
            menuTypesIsOpen: !this.state.menuTypesIsOpen
        });
    }
    toggleManage = (e) => {
        if (this.bubbleBlocked) 
            return;
        this.setState({
            ...this.state,
            manageIsOpen: !this.state.manageIsOpen,
        });
    }
    toggleManage = (e) => {
        if (this.bubbleBlocked) 
            return;
        this.setState({
            ...this.state,
            manageIsOpen: !this.state.manageIsOpen,
        });
    }
     
    toggleCreate = (e) => {
        this.blockBubbling();
        this.setState({
            ...this.state,
            manageIsOpen: false,
            createIsOpen: !this.state.createIsOpen,
        });
    }
    toggleEdit = (menuItem) => {
        this.setState({
            ...this.state,
            toEdit: menuItem || {},
            editIsOpen: !this.state.editIsOpen
        });
    }

    toggleDelete = (menuItem) => {
        this.setState({
            ...this.state,
            toDelete: menuItem || {},
            deleteIsOpen: !this.state.deleteIsOpen
        });
    }

    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchMenus({search: text});
    }


}