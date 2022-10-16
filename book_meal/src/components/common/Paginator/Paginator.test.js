import React from 'react';
import { shallow }  from 'enzyme';
import sinon from 'sinon';
import 'src/utils/bootTests'; // order matters!
import Paginator from './Paginator';
import Adapter from 'enzyme-adapter-react-16';

let pageInfo ={
    hasNext: true,
    hasPrev: true,
    prevPage: 1,
    nextPage: 2,
};

describe ('<Paginator/>', ()=>{
    it('renders correctly', () => {
        const wrapper = shallow(<Paginator pageInfo={pageInfo} onNext={() => {}} onPrev={() => {}} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('shows next button', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Paginator onNext={spy} onPrev={() => {}} pageInfo={pageInfo}/>);
        wrapper.find('.btn-next').simulate('click');
        expect(spy.called).toBe(true);
    });
    it('shows previous button', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Paginator onPrev={spy} onNext={() => {}} pageInfo={pageInfo}/>);
        wrapper.find('.btn-prev').simulate('click');
        expect(spy.called).toBe(true);
    });
});