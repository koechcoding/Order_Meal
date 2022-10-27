import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Login from './Login';

describe('<Login />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.find('.btn').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });
    it('records changes', () => {
        const wrapper = shallow(<Login />);
        wrapper.instance().onChange({target:{name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});