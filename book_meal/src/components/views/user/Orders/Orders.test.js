import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Orders from './Orders';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    toggle: () => {},
    setLoading: () => {},
    toggleMenu: () => {},
    isOpen: false,
};

describe('<Orders />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Orders {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('sets current page', () => {
        const wrapper = shallow(<Orders {...props}/>);
        wrapper.instance().onPageChange(2);
        expect(wrapper.state('page')).toBe(2);
    });
});