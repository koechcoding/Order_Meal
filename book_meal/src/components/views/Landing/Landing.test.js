import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Landing from './Landing';

describe('<Landing />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper).toMatchSnapshot();
    });
});