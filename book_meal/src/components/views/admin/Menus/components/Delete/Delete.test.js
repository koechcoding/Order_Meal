
import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import Delete from './Delete';
import Adapter from 'enzyme-adapter-react-16';

const props = {isOpen: false, toggle: () => {}, onChange: () => {}, menuItem: {}};
describe('<Delete />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Delete {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Delete {...props }/>);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
});