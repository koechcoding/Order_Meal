import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests';
import Notifications from './Notifications';

const props = {
    toggleMenu: () => {},
    setLoading: () => {}, 
}
describe('<Notifications />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Notifications {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('toggles clear notifications modal', () => {
        const wrapper = shallow(<Notifications {...props}/>);
        const prevState = wrapper.state('clearIsOpen');
        wrapper.instance().toggleClear();
        expect(wrapper.state('clearIsOpen')).toBe(!prevState);
    });
    it('sets current page', () => {
        const wrapper = shallow(<Notifications {...props}/>);
        wrapper.instance().onPageChange(2);
        expect(wrapper.state('page')).toBe(2);
    });
});
