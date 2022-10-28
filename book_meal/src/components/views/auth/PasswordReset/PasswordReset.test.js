import React from 'react';
import { shallow } from 'enzyme';
import 'src/utils/bootTests';//order matters!!
import PasswordReset from './PasswordReset';


describe('<PasswordReset />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<PasswordReset/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('records changes', () => {
        const wrapper = shallow(<PasswordReset />);
        wrapper.instance().onChange({target:{name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});