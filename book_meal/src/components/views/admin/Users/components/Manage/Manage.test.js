import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Manage from './Manage';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    order: {},
    isOpen: false,
    toggle: () => {},
    onChange: () => {},
    setLoading: () => {},
};
describe('<Manage />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Manage {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Manage {...props}/>);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
});