import React from 'react';
import sinon from 'sinon';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';
import { ToggleState, EntryType, Role } from 'src/constants';

const data = {
    columns: [
        {
            type: EntryType.DATE,
            key: 'date',
            title: '', 
        },
        {
            type: EntryType.IMAGE,
            key: 'image',
            title: '',
        },
        {
            type: EntryType.TEXT,
            key: 'text',
            title: '',
        },
        {
            type: EntryType.ROLE,
            key: 'role',
            title: '',
        },
        {
            type: EntryType.TOGGLE,
            key: 'toggle',
            title: '',
        },
    ],
        rows: [{
            date: '10-08-2018',
            image: 'https://placehold.it/10x10',
            text: 'test',
            role: Role.ADMIN,
            toggle: ToggleState.ACCEPTED,
        },
        {
            date: '10-08-2018',
            image: 'https://placehold.it/10x10',
            text: 'test',
            toggle: 'test',
            role: Role.SUPER_ADMIN,
            toggle: ToggleState.PENDING,

        },
        {
            date: '10-08-2018',
            image: 'https://placehold.it/10x10',
            text: 'test',
            role: 1000,
            toggle: 1000,
        },
    ]

};

describe("<Table />", ()=>{
    it("renders successfully", () =>{
        const wrapper = shallow(<Table data={data} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('can be toggled', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Table data={data} onToggle={spy} />);
        wrapper.find('.pending').simulate('click');
        expect(spy.called).toBe(true);
    });
    it('can be edited', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Table data={data} onEdit={spy} />);
        wrapper.find('.edit-act').first().simulate('click');
        expect(spy.called).toBe(true);
    });
    it('can be deleted', () => {
        const spy = sinon.fake();
        const wrapper = shallow(<Table data={data} onDelete={spy} />);
        wrapper.find('.delete-act').first().simulate('click');
        expect(spy.called).toBe(true);
    });

});

