import React from "react";
import { RiShoppingCart2Line, RiDeleteBin2Line } from 'react-icons/ri'

export function ListItem({ book, handleAddToCart, handleRemoveFromCart, shoppingCartValue = 0 }) {
    const image = require('./../../public/' + book.id + '.jpeg');
    return (
        <React.Fragment>
            <img alt={book.tite} src={image.default} />
            <div className="bookStore-list-item-description">
                <div>
                    <p>{book.title}</p>
                    <p className="subText">By {book.author}</p>
                    <p>$ {parseInt(book.amount).toFixed(2)}</p>
                </div>
                <div className="bookStore-list-item-actionButtons">
                    <button id={`${book.id}-add`} onClick={() => { handleAddToCart(book.id) }}><RiShoppingCart2Line /></button>
                    <input readOnly defaultValue={0} value={shoppingCartValue} />
                    <button id={`${book.id}-remove`} disabled={!shoppingCartValue} onClick={() => { handleRemoveFromCart(book.id) }}><RiDeleteBin2Line /></button>
                </div>
            </div>
        </React.Fragment>
    )
}