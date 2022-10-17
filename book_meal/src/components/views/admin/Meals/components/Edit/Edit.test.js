import React from 'react';
import { shallow, mount} from 'enzyme';
import 'src/utils/bootTests';
import Edit from './Edit';
import Adapter from 'enzyme-adapter-react=16';

const proops = { meal: {}, isOpen: true, toggle:()=>{}, onChange:()=>{}, setLoading:()=>{}}
describe('<Edit />', ()=>{
    it('renders correctly', ()=>{
        const wrapper = shallow(<Edit {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('adds image', ()=>{
        const wrapper = shallow(<Edit {...props} />);
        wrapper.instance().onImageAdded('test');
        expect(wrapper.state('image')).toBe('test');
    });
    it('resets on opened', ()=>{
        const wrapper = shallow(<Edit {...props} />);
        wrapper.setState({...wrapper.state(), error: true, success: true});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
        expect(wrapper.state('success')).toBe(false);
    });
    it('removes image', () => {
        const wrapper = shallow(<Edit {...props} />);
        wrapper.instance().onImageRemoved();
        expect(wrapper.state('image')).toBe(null);
    });
    it('records input change', () => {
        const wrapper = mount(<Edit {...props} />);
        wrapper.instance().onChange({target: {name: 'name', value: 'value'}});
        expect(wrapper.state('name')).toBe('value');
    });
});