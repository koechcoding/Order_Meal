
import React from 'react';
import sinon from 'sinon';
import 'src/utils/bootTests'; 
import Sidebar from './Sidebar';
import { shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<Sidebar />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Sidebar history={{push: () => {}}} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('logs out a user', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Sidebar history={{push: spy}} />)
        wrapper.find('.btn-logout').simulate('click');
        expect(spy.called).toBe(true);
    })
});
