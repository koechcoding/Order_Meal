import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Delete from './Delete';
import Adapter from 'enzyme-adapter-react-16';

const props = {meal: {},  onChange:() => {}, toggle: () => {}, isOpen: false};

describe('<Delete />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Delete {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});