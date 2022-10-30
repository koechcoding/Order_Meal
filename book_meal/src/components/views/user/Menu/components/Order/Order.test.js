import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Order from './Order';

const props = {toggle: () => {}, setLoading: () => {}, item: {}, menu: {}}
describe('<Order />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Order {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Order {...props}/>);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
    it('records input changes', () => {
        const wrapper = shallow(<Order {...props}/>);
        wrapper.instance().onChange({target:{name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});