import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Body from './Body';

describe('<Body />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Body/>);
        expect(wrapper).toMatchSnapshot();
    });
});

