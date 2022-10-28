import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import RequestPasswordReset from './RequestPasswordReset';

describe('<RequestPasswordReset />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<RequestPasswordReset/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('records changes', () => {
        const wrapper = shallow(<RequestPasswordReset />);
        wrapper.instance().onChange({target:{name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});