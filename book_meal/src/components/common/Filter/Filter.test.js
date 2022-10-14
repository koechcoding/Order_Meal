import React from 'react';
import { shallow, mount} from 'enzyme';
import 'src/utils/bootTests';
import Filter from './filter';
import Adapter from 'enzyme-adapter-react-16';

describe('<Filter/>', ()=>{
    it('renders correctly', ()=>{
        const wrapper = shallow(<Filter onFilter={()=>{}}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('accepts input', ()=>{
        const wrapper = shallow(<Filter onFilter={()=>{}}/>);
        wrapper.find('input').simulate('change', {target: {value: 'hi there'}});
        expect(wrapper.state('text')).toEqual('hi there');
    });
    it('accepts resetting', ()=>{
        const wrapper = mount(<Filter onFilter={()=>{}}/>);
        wrapper.find('input').simulate('change', {target: {value: "hi"}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('text')).toEqual('');
    });
});