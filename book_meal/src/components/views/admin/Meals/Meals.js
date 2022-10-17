import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import MealsTable from './components/MealsTable';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';
import axios from 'src/axios';

import { singleError, paginationInfo} from 'src/utils';

class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: {},
            search: '',
            toEdit: {},
            toDelete: {},
            perPage: 5,
            editIsOpen: false,
            createIsOpen: false,
            deleteIsOpen: false,
        }
    }

    componentWillMount() {
        this.fetchMeals()
    }

    fetchMeals = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        search = (search) ? `name:${search}` : '';
        const link = `/meals?page=${page}&search=${search}&per_page=${perPage}`;

        this.setState({
            ...this.state,
        });
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

            // if we have an empty page and there's data in the previous
            // page...
            if (pageInfo.currentCount === 0 && pageInfo.currentPage !== 1) {
                this.fetchMeals({
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

    toggleCreate = (e) => {
        this.setState({
            ...this.state,
            createIsOpen: !this.state.createIsOpen
        });
    }

    toggleEdit = (meal) => {
        this.setState({
            ...this.state,
            toEdit: meal || {},
            editIsOpen: !this.state.editIsOpen
        });
    }


    toggleDelete = (meal) => {
        this.setState({
            ...this.state,
            toDelete: meal || {},
            deleteIsOpen: !this.state.deleteIsOpen
        });
    }


    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchMeals({search: text});
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchMeals({
            page: page,
            search: this.state.search
        });
    }
}