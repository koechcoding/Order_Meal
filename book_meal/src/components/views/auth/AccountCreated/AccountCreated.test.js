import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import AccountCreated from './AccountCreated';

describe('<AccountCreated />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<AccountCreated/>);
        expect(wrapper).toMatchSnapshot();
    });
});