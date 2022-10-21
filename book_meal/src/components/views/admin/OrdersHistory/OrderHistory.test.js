import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import OrdersHistory from './OrdersHistory';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    toggle: () => {},
    setLoading: () => {},
    toggleMenu: () => {},
    isOpen: false,
};
describe('<OrdersHistory />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<OrdersHistory {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('sets current page', () => {
        const wrapper = shallow(<OrdersHistory {...props}/>);
        wrapper.instance().onPageChange(2);
        expect(wrapper.state('page')).toBe(2);
    });
});
