import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Header from './Header';

describe('<Header />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Header/>);
        expect(wrapper).toMatchSnapshot();
    });
});