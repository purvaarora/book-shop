/*
To try and encourage more sales of different books from a popular 5 book series, a bookshop has decided to offer discounts on multiple book 
purchases. One copy of any of the five books costs $8. If, however, you buy two different books, you get a 5% discount on those two books. 
If you buy 3 different books, you get a 10% discount. If you buy 4 different books, you get a 20% discount. 
If you buy all 5, you get a 25% discount.

Note: that if you buy four books, of which 3 are different titles, you get a 10% discount on the 3 that form part of a set, but the fourth book 
still costs $8. Your mission is to write a piece of code to calculate the price of any conceivable shopping basket (containing only books of 
the same series), giving as big a discount as possible.
For example, how much does this basket of books cost?
2 copies of the first book 2 copies of the second book 2 copies of the third book 1 copy of the fourth book 1 copy of the fifth book
*/

import React from 'react'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import values from 'lodash/values'
import sum from 'lodash/sum'
import PropTypes from 'prop-types'

import ListItem from './components/ListItem'

class BookStore extends React.Component {
  constructor(props) {
    super(props);
    this.baseFare = 8; // Base fare for each book (All books have same fare for this case)
    this.state = {
      shoppingCart: {}, // to maintain books added by guest
      amount: 0, // final amount of cart
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleTotalBill = this.handleTotalBill.bind(this)
  }

  // Method to add a book to shopping cart
  handleAddToCart(id) {
    let shoppingCart = this.state.shoppingCart
    if (!shoppingCart[id]) {
      shoppingCart[id] = 1
    } else {
      shoppingCart[id]++
    }
    this.setState({
      shoppingCart
    }, () => {
      this.handleTotalBill()
    })
  }

  // Method to remove a book from shopping cart
  handleRemoveFromCart(id) {
    let shoppingCart = cloneDeep(this.state.shoppingCart)
    shoppingCart[id]--
    if (shoppingCart[id] === 0) {
      delete (shoppingCart[id])
    }
    this.setState({
      shoppingCart
    }, () => {
      this.handleTotalBill()
    })
  }

  handleTotalBill() {
    let { amount = 0 } = this.state
    let tempShoppingCart = cloneDeep(this.state.shoppingCart)
    let totalAmount = 0
    // Discount based on unique books count
    let getDiscount = function (count) {
      switch (count) {
        case 2:
          return 5;
        case 3:
          return 10;
        case 4:
          return 20;
        case 5:
          return 25;
        default:
          break;
      }
    }
    /* 
      Create sets of unique books to maximum discount calculation. 
      For example if cart has AABBCDE,
      first calculate price for ABCDE - 25% discount
      then price for AB - 5% discount
    */
    while (Object.keys(tempShoppingCart).length > 0) {
      let differentBooksCount = 0

      for (let book in tempShoppingCart) {
        differentBooksCount++
        tempShoppingCart[book]--
        if (tempShoppingCart[book] === 0) {
          delete (tempShoppingCart[book])
        }
      }
      amount = this.baseFare * differentBooksCount
      if (differentBooksCount > 1) {
        amount -= (getDiscount(differentBooksCount) / 100 * amount)
      }
      totalAmount += amount
    }
    this.setState({
      amount: totalAmount
    })
  }

  render() {
    let { shoppingCart, amount } = this.state
    let { books } = this.props
    let totalBooksCount = sum(values(shoppingCart))
    let totalDiscount = this.baseFare * totalBooksCount - amount
    return (
      <div className="bookStore">
        <h1>Book Shop</h1>
        <div className="bookStore-container">
          <div className="bookStore-list">
            {
              // Map through books master data to display book item
              map(books, (book) => {
                return (
                  <div className="bookStore-list-item" key={book.id}>
                    <ListItem
                      book={book}
                      handleAddToCart={this.handleAddToCart}
                      handleRemoveFromCart={this.handleRemoveFromCart}
                      shoppingCartValue={shoppingCart[book.id]}
                      baseBookFare={this.baseFare}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="bookStore-shoppingCart">
            {
              Object.keys(shoppingCart).length > 0 ? <React.Fragment>
                <h3>SHOPPING CART</h3>
                {
                  map(shoppingCart, (count, bookId) => {
                    return (
                      <div key={bookId} className="bookStore-shoppingCart-item">
                        <div>{get(find(books, ['id', bookId]), 'title', '')}</div>
                        <div>{count}</div>
                      </div>
                    )
                  })
                }
                <div className="bookStore-totalBill">
                  {
                    // Show discount and total amount fields only if any discount is applied
                    totalDiscount > 0 && <React.Fragment>
                      <div className="bookStore-totalBill-item">
                        <div>Total Amount:</div>
                        <div>$ {(this.baseFare * totalBooksCount).toFixed(2)}</div>
                      </div>
                      <div className="bookStore-totalBill-item">
                        <div>Discount:</div>
                        <div>- $ {totalDiscount.toFixed(2)}</div>
                      </div>
                    </React.Fragment>
                  }
                  <div className="bookStore-totalBill-item finalAmount">
                    <div>Final Amount:</div>
                    <div>$ {amount.toFixed(2)}</div>
                  </div>
                </div>
              </React.Fragment> :
                // Displayed when cart is empty
                <div>Your cart is empty!</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

BookStore.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default BookStore
