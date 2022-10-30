import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests';
import Menu from './Menu';

const props = {
    toggleMenu: () => {}, 
    toggle: () => {}, 
    setLoading: () => {}, 
    item: {}, 
    menu: {}
}
describe('<Menu />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Menu {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('toggles order menu', () => {
        const wrapper = shallow(<Menu {...props}/>);
        const prevState = wrapper.state('orderIsOpen');
        wrapper.instance().toggleOrder();
        expect(wrapper.state('orderIsOpen')).toBe(!prevState);
    });
    it('resets current menu', () => {
        const wrapper = shallow(<Menu {...props}/>);
        wrapper.instance().onReset();
        expect(wrapper.state('currentMenu')).toBe(0);
    });
});