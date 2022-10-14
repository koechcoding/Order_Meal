import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import 'src/utils/bootTests'; //order matters
import AuthPage from './AuthPage';
import Adapter from 'enzyme-adapter-react-16';

describe('<AuthPage />', ()=>{
    it('renders correctly', ()=>{
        const wrapper = shallow(<AuthPage/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.logo-small').text()).toEqual('BAM!')
    });
});