import React from 'react';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import UsersTable from './components/UsersTable';
import ManageModal from './components/Manage';
import axios from 'src/axios';

import { singleError, paginationInfo } from 'src/utils';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: {},
            search: '',
            perPage: 5,
        }
    }

    componentWillMount() {
        this.fetchUsers()
    }

    fetchUsers = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        this.props.setLoading(true);

        axios.auth();
        const link = `/users?page=${page}&search=${search}&per_page=${perPage}`;
        axios.get(link).then(({ data }) => {
            const pageInfo = paginationInfo(data);
            this.setState({
                ...this.state,
                page: pageInfo.currentPage,
                data,
            });
            this.props.setLoading(false);
            if (pageInfo.currentCount === 0 && pageInfo.currentPage !== 1) {
                this.fetchUsers({
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

    toggleManage = (e) => {
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
        this.fetchUsers({search: text});
    }

    onToggle = (user) => {
        this.setState({
            ...this.state,
            manageIsOpen: true,
            toManage: user,
        });
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchUsers({
            page: page,
            search: this.state.search
        });
    }

    render() {
        const { 
            data,
            error,
            pageInfo,
            toManage,
            manageIsOpen
        } = this.state;

        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Manage Users</h5>
            </div>
        );

        const contentFilter = (
            <Filter onFilter={this.onFilter} />
        );

        return (
            <Content 
                {...this.props}
                contentTop={contentTop} 
                contentFilter={contentFilter}>
            
                { error && <Alert color="danger"> { singleError(error) }</Alert> }
                     <UsersTable 
                         data={data}
                         pageInfo={pageInfo}
                         onPrev={this.onPageChange}
                         onToggle={this.onToggle}
                         onNext={this.onPageChange} />

                    <ManageModal 
                        {...this.props}
                        user={toManage} 
                        onChange={this.fetchUsers}
                        isOpen={manageIsOpen} 
                        toggle={this.toggleManage}/>
            </Content>
        );
    }
}

export default Users;