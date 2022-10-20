import React from 'react';
import axios from 'src/axios';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import OrdersTable from './components/OrdersTable';
import ManageModal from './components/Manage';
import { singleError, paginationInfo } from 'src/utils';