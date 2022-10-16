import React from 'react';
import { shallow, mount }  from 'enzyme';
import 'src/utils/bootTests'; 
import Create from './Create';
import Adapter from 'enzyme-adapter-react-16';

const props = { toggle:() => {}, onChange:() => {}, setLoading:() => {}}
describe('<Create />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Create {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('adds image', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().onImageAdded('test');
        expect(wrapper.state('image')).toBe('test');
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.setState({...wrapper.state(), error: true, success: true});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
        expect(wrapper.state('success')).toBe(false);
    });
    it('removes image', () => {
        const wrapper = shallow(<Create {...props} />);
        wrapper.instance().onImageRemoved();
        expect(wrapper.state('image')).toBe(null);
    });
    it('records input change', () => {
        const wrapper = mount(<Create {...props} />);
        wrapper.instance().onChange({target: {name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});
