import React from 'react';
import { shallow, mount} from 'enzyme';
import 'src/utils/bootTests';
import ImageInput from './ImageInput';
import Adapter from 'enzyme-adapter-react-16';

describe('<ImageInput />', ()=>{
    it('renders correctly', ()=>{
        const wrapper = shallow(<ImageInput/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.inner').text()).toequal('click to select image from your files.');
    });
})