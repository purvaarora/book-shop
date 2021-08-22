import React from 'react';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ListItem from './ListItem'

let initialProps = {
    book: {
        id: 'book1',
        amount: 8,
        title: 'Harry Potter and the Sorcerers Stone',
        author: 'J.K. Rowling'
    },
    handleAddToCart: jest.fn(),
    handleRemoveFromCart: jest.fn(),
    shoppingCartValue: 1
}

describe('ListItem component tests', () => {
    it('matches snapshot', () => {
        const component = renderer.create(
            <ListItem {...initialProps} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('call handleAddToCart on add button click', () => {
        const wrapper = shallow(<ListItem  {...initialProps}/>);
        wrapper.find('.bookStore-list-item-actionButtons-add').simulate('click');
        expect(initialProps.handleAddToCart).toHaveBeenCalledTimes(1);
    })

    it('call handleRemoveFromCart on add button click', () => {
        const wrapper = shallow(<ListItem  {...initialProps}/>);
        wrapper.find('.bookStore-list-item-actionButtons-remove').simulate('click');
        expect(initialProps.handleRemoveFromCart).toHaveBeenCalledTimes(1);
    })
})




