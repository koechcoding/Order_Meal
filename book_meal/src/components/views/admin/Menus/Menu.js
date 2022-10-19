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
