import React from "react";
import { shallow } from 'enzyme';
import 'src/utils/bootTests';
import Register  from "./Register";

describe('<Register />', ()=>{
    it('renders correctly', ()=>{
        const wrapper = shallow(<Register/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('records changes', ()=>{
        const wrapper = shallow(<Register/>);
        wrapper.instance().onChange({target:{name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});