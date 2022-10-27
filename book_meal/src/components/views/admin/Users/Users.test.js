import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Users from './Users';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    toggle: () => {},
    setLoading: () => {},
    toggleMenu: () => {},
    isOpen: false,
};
describe('<Users />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Users {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('sets current page', () => {
        const wrapper = shallow(<Users {...props}/>);
        wrapper.instance().onPageChange(2);
        expect(wrapper.state('page')).toBe(2);
    });
    it('toggles manage modal', () => {
        const wrapper = shallow(<Users {...props}/>);
        const prevState = wrapper.state('manageIsOpen');
        wrapper.instance().toggleManage();
        expect(wrapper.state('manageIsOpen')).toBe(!prevState);
    });
    it('shows manage modal', () => {
        const wrapper = shallow(<Users {...props}/>);
        wrapper.instance().onToggle({name: 'name'});
        expect(wrapper.state('toManage')).toEqual({name: 'name'});
    });
});