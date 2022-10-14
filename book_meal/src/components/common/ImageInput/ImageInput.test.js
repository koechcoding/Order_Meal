import React from 'react';
import { shallow, mount }  from 'enzyme';
import 'src/utils/bootTests';
import ImageInput from './ImageInput';
import Adapter from 'enzyme-adapter-react-16';

describe('<ImageInput />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<ImageInput/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.inner').text()).toEqual('Click to select image from your files.');
    });
    it('renders prefill image', () => {
        const wrapper = shallow(<ImageInput prefill={'https://plachold.it/10x10'}/>);
        expect(wrapper.find('.preview').length).toBe(1);
    });
    it('removes prefill image', () => {
        const wrapper = shallow(<ImageInput onPrefillRemoved={() => {}} prefill={'https://plachold.it/10x10'}/>);
        expect(wrapper.find('.preview').length).toBe(1);
        wrapper.find('.btn-danger').simulate('click');
        expect(wrapper.find('.preview').length).toBe(0);
    });
    it('selects image', () => {
        const wrapper = mount(<ImageInput onPrefillRemoved={() => {}} prefill={'https://plachold.it/10x10'}/>);
        wrapper.find('input').simulate('change', { 
            target: {
                files: [new File(['abc'], 'file.png', {type: 'image/png'})]
            }
        });
        expect(wrapper.state('fileName')).toEqual('file.png');
    });
    it('removes selected image', () => {
        const wrapper = mount(<ImageInput onPrefillRemoved={() => {}} onImageRemoved={() => {}}/>);
        wrapper.find('input').simulate('change', { 
            target: {
                files: [new File(['abc'], 'file.png', {type: 'image/png'})]
            }
        });
        expect(wrapper.state('fileName')).toEqual('file.png');
        wrapper.find('.remove').simulate('click');
        expect(wrapper.state('fileName')).toEqual('');
    });
});