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
    it("handleAddToCart is called and item is added to shopping cart", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state("shoppingCart")).toEqual({});
      expect(wrapper.state("amount")).toEqual(0);
      const handleAddToCartSpy = jest.spyOn(wrapper.instance(), "handleAddToCart");
      const handleTotalBillSpy = jest.spyOn(wrapper.instance(), "handleTotalBill");

      //2 copies of the first book 2 copies of the second book 2 copies of the third book 1 copy of the fourth book 1 copy of the fifth book
      
      // First add book1
      wrapper.instance().handleAddToCart('book1');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1 })
      expect(wrapper.state("amount")).toEqual(8)


      // Add book2 to cart
      wrapper.instance().handleAddToCart('book2');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(2);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1, 'book2': 1 })
      expect(wrapper.state("amount")).toEqual(15.2)

      // Add book3 
      wrapper.instance().handleAddToCart('book3');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(3);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1, 'book2': 1, 'book3': 1 })
      expect(wrapper.state("amount")).toEqual(21.6)

      // Add book4 
      wrapper.instance().handleAddToCart('book4');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(4);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1, 'book2': 1, 'book3': 1, 'book4': 1 })
      expect(wrapper.state("amount")).toEqual(25.6)

      // Add book5 
      wrapper.instance().handleAddToCart('book5');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(5);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1, 'book2': 1, 'book3': 1, 'book4': 1, 'book5': 1 })
      expect(wrapper.state("amount")).toEqual(30)


      // Add book1 again
      wrapper.instance().handleAddToCart('book1');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(6);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 2, 'book2': 1, 'book3': 1, 'book4': 1, 'book5': 1 })
      expect(wrapper.state("amount")).toEqual(38)

      // Add book2 again
      wrapper.instance().handleAddToCart('book2');
      expect(handleAddToCartSpy).toHaveBeenCalledTimes(7);
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 2, 'book2': 2, 'book3': 1, 'book4': 1, 'book5': 1 })
      expect(wrapper.state("amount")).toEqual(45.2)

      
      handleAddToCartSpy.mockReset();
      handleAddToCartSpy.mockRestore();

      expect(handleTotalBillSpy).toHaveBeenCalledTimes(7);
      handleTotalBillSpy.mockReset();
      handleTotalBillSpy.mockRestore();
    });
  })

  describe('handleRemoveFromCart removed a book from shopping cart', () => {
    it("handleRemoveFromCart is called and item is removed from shopping cart", () => {
      const wrapper = shallow(<App />);
      const handleRemoveFromCartSpy = jest.spyOn(wrapper.instance(), "handleRemoveFromCart");
      const handleTotalBillSpy = jest.spyOn(wrapper.instance(), "handleTotalBill");
      // Add 2 books book1 and book2 to cart
      wrapper.instance().handleAddToCart('book1');
      wrapper.instance().handleAddToCart('book2');
      expect(wrapper.state("shoppingCart")).toEqual({ 'book1': 1, 'book2': 1 })
      expect(wrapper.state("amount")).toEqual(15.2)

      // Remove book1 from cart
      wrapper.instance().handleRemoveFromCart('book1');
      expect(handleRemoveFromCartSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state("amount")).toEqual(8)
      handleRemoveFromCartSpy.mockReset();
      handleRemoveFromCartSpy.mockRestore();
      expect(wrapper.state("shoppingCart")).toEqual({ 'book2': 1 })
      expect(handleTotalBillSpy).toHaveBeenCalledTimes(3);
      handleTotalBillSpy.mockReset();
      handleTotalBillSpy.mockRestore();
    });
  })
})




