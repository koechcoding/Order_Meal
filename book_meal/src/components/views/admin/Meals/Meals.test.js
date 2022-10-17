
import React from 'react';
import { shallow, mount }  from 'enzyme';
import 'src/utils/bootTests'; 
import Meals from './Meals';
import Adapter from 'enzyme-adapter-react-16';

const props = {toggleMenu:() => {}, setLoading:() => {}};
describe('<Meals />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Meals {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('sets current page', () => {
        const wrapper = shallow(<Meals {...props}/>);
        wrapper.instance().onPageChange(2);
        expect(wrapper.state('page')).toBe(2);
    });
});