import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Edit from './Edit';
import Delete from './Delete';
import MenuTypes from './MenuTypes';
import Adapter from 'enzyme-adapter-react-16';

const props = { menu: {}, onChange: () => {}, isOpen: true, 
                toggle: () => {}, setLoading: () => {}};
describe('<MenuTypes />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('toggles edit modal', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        let prevState = wrapper.state('deleteIsOpen');
        wrapper.instance().toggleDelete();
        expect(wrapper.state('deleteIsOpen')).toBe(!prevState);
    });
    it('sets delete menu', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        wrapper.instance().onDelete({ menu: 'Supper' });
        expect(wrapper.state('toDelete')).toEqual({ menu: 'Supper' });
    });
    it('toggles edit modal', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        let prevState = wrapper.state('editIsOpen');
        wrapper.instance().toggleEdit();
        expect(wrapper.state('editIsOpen')).toBe(!prevState);
    });
    it('sets edit menu', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        wrapper.instance().onEdit({ menu: 'Supper' });
        expect(wrapper.state('toEdit')).toEqual({ menu: 'Supper' });
    });
    it('records input changes', () => {
        const wrapper = shallow(<MenuTypes {...props}/>);
        wrapper.instance().onChange({target:{ name: 'name', value: 'value' }});
        expect(wrapper.state('name')).toEqual('value');
    });
});

describe('<Delete />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Delete {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<Edit />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Edit {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Edit {...props}/>);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
    it('records input changes', () => {
        const wrapper = shallow(<Edit {...props}/>);
        wrapper.instance().onChange({target:{ name: 'name', value: 'value' }});
        expect(wrapper.state('name')).toEqual('value');
    });
});