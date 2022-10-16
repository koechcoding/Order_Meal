import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Footer from './Footer';

describe('<Footer />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Footer/>);
        expect(wrapper).toMatchSnapshot();
    });
});