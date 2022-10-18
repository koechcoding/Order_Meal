import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Create from './Create';
import Adapter from 'enzyme-adapter-react-16';

const props = { toggle:() => {}, onChange:() => {}, setLoading:() => {}}
describe('<Create />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Create {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.setState({...wrapper.state(), error: true});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
    it('records changes', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().onChange({target: {name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
    it('sets selected menu', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().setSelectedMenu ('menu');
        expect(wrapper.state('menu')).toBe('menu');
    });
    it('sets selected meal', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().setSelectedMeal('meal');
        expect(wrapper.state('meal')).toBe('meal');
    });
    it('resets state', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().setState({...wrapper.state(), meal: 'meal'});
        wrapper.instance().reset();
        expect(wrapper.state('meal')).toBe('');
    });
});