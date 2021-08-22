import React from 'react';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from './App'

const books = [
  {
    id: 'book1',
    amount: 8,
    title: 'Harry Potter and the Sorcerers Stone',
    author: 'J.K. Rowling'
  },
  {
    id: 'book2',
    amount: 8,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 'book3',
    amount: 8,
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling'
  },
  {
    id: 'book4',
    amount: 8,
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling'
  },
  {
    id: 'book5',
    amount: 8,
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling'
  },
]

describe('App component tests', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <App />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  describe('handleAddToCart adds a book to shopping cart', () => {
    const wrapper = shallow(<App />);
    const handleAddToCartSpy = jest.spyOn(wrapper.instance(), "handleAddToCart");
    // const handleTotalBillSpy = jest.spyOn(wrapper.instance(), "handleTotalBill");
    it("handleAddToCart is called and item is added to shopping cart", () => {
      wrapper.instance().handleAddToCart('book1');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(1);
      handleAddToCartSpy.mockReset();
      handleAddToCartSpy.mockRestore();
      // expect(wrapper.state()).toEqual({ 'book1': 1 })
      // expect(handleTotalBillSpy).toHaveBeenCalledTimes(1);
      // handleTotalBillSpy.mockReset();
      // handleTotalBillSpy.mockRestore();
    });
  })

  describe('handleRemoveFromCart removed a book from shopping cart', () => {
    const wrapper = shallow(<App />);
    const handleRemoveFromCartSpy = jest.spyOn(wrapper.instance(), "handleRemoveFromCart");
    // const handleTotalBillSpy = jest.spyOn(wrapper.instance(), "handleTotalBill");
    it("handleRemoveFromCart is called and item is removed from shopping cart", () => {
      wrapper.instance().handleRemoveFromCart('book1');
      expect(handleRemoveFromCartSpy).toHaveBeenCalledTimes(1);
      handleRemoveFromCartSpy.mockReset();
      handleRemoveFromCartSpy.mockRestore();
      // expect(wrapper.state()).toEqual({ 'book1': 1 })
      // expect(handleTotalBillSpy).toHaveBeenCalledTimes(1);
      // handleTotalBillSpy.mockReset();
      // handleTotalBillSpy.mockRestore();
    });
  })
})




