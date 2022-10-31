import React from 'react';
import axios from 'src/axios';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import Paginator from 'src/components/common/Paginator';
import ClearModal from './components/Clear';
import { paginationInfo, singleError } from 'src/utils';


class Notifications extends React.Component {

    state = {
        data: {},
        search: '',
        perPage: 6,
    }

    componentWillMount() {
        this.fetchNotifications();
    }

    fetchNotifications = (config = {}) => {
        this.props.setLoading(true);
        const { 
            page = this.state.page,
            search = this.state.search,
            perPage = this.state.perPage,
        } = config;

        const link = 
            `/notifications?per_page=${perPage}&search=${search}&page=${page}`;
        axios.get(link).then(({ data }) => {
            this.setState({
                ...this.state,
                data,
                pageInfo: paginationInfo(data)
            });
            this.props.setLoading(false);
        }).catch(({ response }) =>  {
            this.props.setLoading(false);
        })
    }

    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchNotifications({search: text});
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchNotifications({
            page: page,
            search: this.state.search
        });
    }

    toggleClear = () => {
        this.setState({
            ...this.state,
            clearIsOpen: !this.state.clearIsOpen
        });
    }

    onClear = (id) => {
        axios.auth();
        this.props.setLoading(true);
        let link = null;
        if (id) {
            link = `notifications/${id}`;
        } else {
            link = 'notifications';
        }
        axios.delete(link).then(() => {
            this.fetchNotifications();
            this.props.setLoading(false);
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response
            });
            this.props.setLoading(false);
        });
    }

    render() {
        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Notifications</h5>
                <button onClick={this.toggleClear} className="btn btn-secondary float-right">
                    Clear All
                </button>
            </div>
        );

        const contentFilter = (
            <Filter onFilter={this.onFilter} />
        );

        const { clearIsOpen, pageInfo, error } = this.state;
        const { notifications = [] } = this.state.data;
        return (
            <Content 
                {...this.props}
                contentTop={contentTop} 
                contentFilter={contentFilter}>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }

                <div className="row">
                    {notifications.map((notice) => (
                        <div key={notice.id} className="col-12 col-sm-6 p-2">
                            <div className="notice p-2">
                                <span onClick={() => this.onClear(notice.id)} className="notice-close">&times;</span>
                                <h5>{notice.title}</h5>
                                <p>{notice.message}</p>
                            </div>
                        </div>
                    ))}

                </div>
                {notifications.length === 0 &&
                    <p className="text-center">You have no notifications for now.</p>
                }

                <ClearModal 
                    {...this.props}
                    onChange={this.fetchNotifications}
                    isOpen={clearIsOpen} 
                    toggle={this.toggleClear}/>

                {notifications.length !== 0 && 
                    <Paginator 
                        onPrev={this.onPageChange}
                        onNext={this.onPageChange} 
                        pageInfo={pageInfo} />
                }
            </Content>
        );
    }
}

Notifications.propTypes = {
    setLoading: PropTypes.func.isRequired,
}

export default Notifications;