import React from 'react';
import axios from 'src/axios';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import OrdersTable from './components/OrdersTable';
import ManageModal from './components/Manage';
import { singleError, paginationInfo } from 'src/utils';

class Orders extends React.Component {

    constructor(props){
        super(props);
        this.state={
            page: 1,
            data: {},
            search: '',
            perPage: 5,
            manageIsOpen: false,
            toManage: {},
        }
    }
    componentWillMount() {
        this.fetchOrders()
    }

    fetchOrders = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        const link = 
            `/orders?related=menu_item|user&page=${page}&search=${search}&per_page=${perPage}&time=today`;
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
                this.fetchOrders({
                    page: pageInfo.currentPage - 1
                });
            }
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            })
            this.props.setLoading(false);
        })
    }
    toggleManage = () => {
        this.setState({
            ...this.state,
            manageIsOpen: !this.state.manageIsOpen
        });
    }

    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchOrders({search: text});
    }

}