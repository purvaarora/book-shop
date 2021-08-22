import React from 'react'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import values from 'lodash/values'
import sum from 'lodash/sum'

import { ListItem } from './components/ListItem'

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

class BookStore extends React.Component {
  constructor(props) {
    super(props);
    this.books = [
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
    ];
    this.baseFare = 8;
    this.state = {
      shoppingCart: {},
      amount: 0,
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleTotalBill = this.handleTotalBill.bind(this)
  }

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
          return 0;
      }
    }
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
    let totalBooksCount = sum(values(shoppingCart))
    let totalDiscount = this.baseFare * totalBooksCount - amount
    return (
      <div className="bookStore">
        <h1>Purva's Book Shop</h1>
        {/* <div className="bookStore-offer">
          <h3>UPTO 25% discount</h3>
          <h2>BIG SALE</h2>
          <div>*Terms and Conditions applied</div>
        </div> */}
        <div className="bookStore-container">
          <div className="bookStore-list">
            {
              map(this.books, (book) => {
                return (
                  <div className="bookStore-list-item" key={book.id}>
                    <ListItem
                      book={book}
                      handleAddToCart={this.handleAddToCart}
                      handleRemoveFromCart={this.handleRemoveFromCart}
                      shoppingCartValue={shoppingCart[book.id]}
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
                        <div>{get(find(this.books, ['id', bookId]), 'title', '')}</div>
                        <div>{count}</div>
                      </div>
                    )
                  })
                }
                <div className="bookStore-totalBill">
                  {
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
              <div>Your cart is empty!</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BookStore
