import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Edit from './Edit';
import Adapter from 'enzyme-adapter-react-16';

const props = {menuItem: {}, toggle: () => {}, onChange: () => {}, setLoading: () => {}}
describe('<Edit />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Edit {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Edit {...props} />);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
    it('records user input', () => {
        const wrapper = shallow(<Edit {...props} />);
        wrapper.instance().onChange({target: { name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
    it('sets selected menu', () => {
        const wrapper = shallow(<Edit {...props} />);
        wrapper.instance().setSelectedMenu ('menu');
        expect(wrapper.state('menu')).toBe('menu');
    });
    it('sets selected meal', () => {
        const wrapper = shallow(<Edit {...props} />);
        wrapper.instance().setSelectedMeal('meal');
        expect(wrapper.state('meal')).toBe('meal');
    });
});