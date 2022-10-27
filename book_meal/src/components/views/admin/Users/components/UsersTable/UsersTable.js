import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'src/components/common/Paginator';
import { flattenObject, paginationInfo } from 'src/utils';

import Table from 'src/components/common/Table';
import { EntryType } from 'src/constants';

class UsersTable extends React.Component {

    render() {
        const { users = []  } = this.props.data;
        let rows = users.map(row => flattenObject(row));
        const tableData = {
            columns: [
                { key: 'id', title: 'ID', type: EntryType.NUMBER },
                { key: 'email', title: 'Email', type: EntryType.TEXT },
                { key: 'username', title: 'Name', type: EntryType.TEXT },
                { key: 'created_at', title: 'Created On', type: EntryType.DATE },
                { key: 'role', title: 'Role', type: EntryType.ROLE }
            ],
            rows,
        };
        const { onToggle } = this.props;
        const pageInfo = paginationInfo(this.props.data);
        return (
            <div>
                <Table onToggle={onToggle} data={tableData} />
                <Paginator {...this.props} pageInfo={pageInfo} />
            </div>
        );
    }
}

UsersTable.propTypes = {
    data: PropTypes.object
}

export default UsersTable;