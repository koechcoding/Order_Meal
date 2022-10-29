import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import VerifyMail from './VerifyMail';

describe('<VerifyMail />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<VerifyMail/>);
        expect(wrapper).toMatchSnapshot();
    });
});