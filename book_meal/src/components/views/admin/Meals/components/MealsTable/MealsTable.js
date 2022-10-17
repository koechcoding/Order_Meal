import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'src/components/common/Paginator';
import { paginationInfo } from 'src/utils';

import Table from 'src/components/common/Table';
import { EntryType } from 'src/constants';

class MealsTable extends React.Component {

    render() {
        const { meals } = this.props.data;
        const tableData = {
            columns: [
                { key: 'id', title: 'ID', type: EntryType.NUMBER },
                { key: 'img_url', title: 'Image', type: EntryType.IMAGE },
                { key: 'name', title: 'Name', type: EntryType.TEXT },
                { key: 'cost', title: 'Cost', type: EntryType.NUMBER },
                { key: 'created_at', title: 'Created On', type: EntryType.DATE }
            ],
            rows: (meals) ? meals : []
        };
        const pageInfo = paginationInfo(this.props.data);
        const { toggleEdit, toggleDelete } = this.props;
        return (
            <div>
                <Table data={tableData} onEdit={toggleEdit} onDelete={toggleDelete} />
                <Paginator {...this.props} pageInfo={pageInfo} />
            </div>
        );
    }
}

MealsTable.propTypes = {
    data: PropTypes.object.isRequired,
}

export default MealsTable;