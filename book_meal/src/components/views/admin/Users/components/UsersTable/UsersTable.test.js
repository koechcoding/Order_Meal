import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import UsersTable from './UsersTable';
import Adapter from 'enzyme-adapter-react-16';
const props = {
    data: {
        users: [{
            id: 1,
            email: 'mail@test.com',
            username: 'edward',
            created_at: '10-08-2018',
            role: 1,
        }]
    },
    onDelete: () => {},
    onEdit: () => {},
    onNext: () => {},
    onPrev: () => {},
    onToggle: () => {},
}

describe('<UsersTable />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<UsersTable {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});