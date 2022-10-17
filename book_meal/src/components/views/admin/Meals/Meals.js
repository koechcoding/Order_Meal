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
    constructor(props){
        super(props);
        this.state ={
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
    componentWillMount(){
        this.fetchMeals()
    }

    fetchMeals= (config={})=>{
        
    }
}