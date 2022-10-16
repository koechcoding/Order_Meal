import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'src/utils/bootTests';
import Modal from './Modal';
import Adapter from 'enzyme-adapter=react-16';

describe(<Modal />, ()=>{
    it("renders correctly", ()=>{
        const wrapper = shallow(<Modal toggle={()=>{}}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly', ()=>{
        const spy = sinon.fake();
        const wrapper = shallow(<Modal toggle={spy}/>);
        wrapper.find('.close').simulate('click');
        expect(spy.called).toBe(true);
    });
});