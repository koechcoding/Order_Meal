import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Menu from './Menu';
import Adapter from 'enzyme-adapter-react-16';

const items = [{
        id: 0,
        name: 'name',
        cost: 50,
        img_url: '#'
    },
    {
        id: 1,
        name: 'name2',
        cost: 50,
        img_url: '#'
    }
]

describe('<Menu />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Menu items={items} onOrder={() => {}} setLoading={() => {}}/>);
        expect(wrapper).toMatchSnapshot();
    });
});