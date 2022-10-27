import React from 'react';
import ReactDOM from 'react-dom';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Admin from './index';
import Adapter from 'enzyme-adapter-react-16';


describe('<Admin />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Admin/>);
        expect(wrapper).toMatchSnapshot();
    });
});