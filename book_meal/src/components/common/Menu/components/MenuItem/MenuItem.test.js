import React from "react";
import { shallow } from 'enzyme';
import 'src/utils/bootTests';
import MenuItem from './MenuItem';
import Adapter from 'enzyme-adapter-react-16';

const item ={
    meal: {
        cost: 50,
        name: 'name2',
        img_url: null,
    },
}


describe('<MenuItem />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MenuItem onOrder={() => {}} item={item} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with image', () => {
        item['img_url'] = 'https://placehold.it/10x10';
        const wrapper = shallow(<MenuItem onOrder={() => {}} item={item} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with default image', () => {
        item['img_url'] = '#';
        const wrapper = shallow(<MenuItem onOrder={() => {}} item={item} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('orders a menu item', () => {
        const wrapper = shallow(<MenuItem onOrder={() => {}} item={item} />);
        wrapper.find('.btn').simulate('click');
    });
});