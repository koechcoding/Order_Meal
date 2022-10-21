import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import OrdersTable from './OrdersTable';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    data: {
        id: 1,
        quantity: 20,
        created_at: '',
        menu: { name: 'Supper', },
        meal: {
            img_url: 'http://localhost/#',
            name: 'Ugali',
        },
    },
    onDelete: () => {},
    onEdit: () => {},
    onNext: () => {},
    onPrev: () => {},
    onToggle: () => {},
}

describe('<OrdersTable />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<OrdersTable {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});