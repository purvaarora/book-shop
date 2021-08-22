// List item element represents a single book element in the bookshop 

import React from "react";
import PropTypes from 'prop-types'
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi'

function ListItem({
    book, // selected book to create UI element
    handleAddToCart, // handler for button to add book to cart
    handleRemoveFromCart, // handler for button to remove book from cart
    shoppingCartValue, // shoppingcart count 
    baseBookFare // book fare same for all books for this case
}) {
    const image = require('./../../public/' + book.id + '.jpeg');
    return (
        <React.Fragment>
            <img alt={book.tite} src={image.default} />
            <div className="bookStore-list-item-description">
                <div>
                    <p>{book.title}</p>
                    <p className="subText">By {book.author}</p>
                    <p>$ {parseInt(baseBookFare).toFixed(2)}</p>
                </div>
                <div className="bookStore-list-item-actionButtons">
                    <button id={`${book.id}-remove`} className="bookStore-list-item-actionButtons-remove" disabled={!shoppingCartValue} onClick={() => { handleRemoveFromCart(book.id) }}><FiMinusSquare /></button>
                    <input readOnly defaultValue={0} value={shoppingCartValue} />
                    <button id={`${book.id}-add`} className="bookStore-list-item-actionButtons-add" onClick={() => { handleAddToCart(book.id) }}><FiPlusSquare /></button>
                </div>
            </div>
        </React.Fragment>
    )
}

ListItem.propTypes = {
    book: PropTypes.shape({}).isRequired,
    handleAddToCart: PropTypes.func.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
    shoppingCartValue: PropTypes.number,
    baseBookFare: PropTypes.number
};

ListItem.defaultProps = {
    shoppingCartValue: 0,
    baseBookFare: 0
};

export default ListItem