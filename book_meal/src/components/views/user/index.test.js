import React from 'react';
import ReactDOM from 'react-dom';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import User from './index';
import Adapter from 'enzyme-adapter-react-16';


describe('<User />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<User/>);
        expect(wrapper).toMatchSnapshot();
    });
});
