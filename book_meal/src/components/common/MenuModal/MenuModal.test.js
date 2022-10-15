import React from 'react';
import sinon from 'sinon';
import 'src/utils/bootTests'; 
import { shallow }  from 'enzyme';
import MenuModal from './MenuModal';
import Adapter from 'enzyme-adapter-react-16';

describe('<MenuModal />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MenuModal toggle={() => {}}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('can be toggled', () => {
        const toggle = sinon.fake();
        const wrapper = shallow(<MenuModal toggle={toggle}/>);
        wrapper.find('.close').simulate('click');
        expect(toggle.called).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    it('can be logged out', () => {
        const wrapper = shallow(<MenuModal toggle={() => {}} history={{ push: () => {} }}/>);
        wrapper.find('.btn-logout').simulate('click');
        expect(wrapper).toMatchSnapshot();
    });
});