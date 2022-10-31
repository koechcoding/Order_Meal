import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests';
import Clear from './Clear';

const props = {
    isOpen: true,
    toggle: () => {}, 
    setLoading: () => {}, 
}
describe('<Clear />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Clear {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('resets on opened', () => {
        const wrapper = shallow(<Clear {...props}/>);
        wrapper.setState({...wrapper.state(), error: 'error'});
        wrapper.instance().onOpened();
        expect(wrapper.state('error')).toBe(null);
    });
});
