import React from 'react';
import { connect } from 'react-redux';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/actions/shoppingCart';

import './CartListItem.scss';

const CartListItem = ({
  product,
  description,
  price,
  url,
  id,
  cartItems,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
}) => {
  const selectedItem = cartItems.filter((item) => item.id === id)[0];

  const removeItem = (itemToRemove) => {
    removeItemFromCart(itemToRemove);
  };
  const addItem = (itemToAdd) => {
    addItemToCart(itemToAdd);
  };

  const clearItem = (itemToClear) => {
    clearItemFromCart(itemToClear);
  };
  return (
    <>
      <div className='CartListItem'>
        <div className='CartListItem__image'>
          <img src={url} alt={product} />
        </div>
        <div className='CartListItem__details'>
          <div className='CartListItem__details-product'>{product}</div>
          <div className='CartListItem__details-description'>{description}</div>
        </div>
        <div className='CartListItem__quantity'>
          <div
            onClick={() => removeItem(selectedItem)}
            className='CartListItem__quantity-decrease'
          >
            <i className='fas fa-chevron-left'></i>
          </div>
          <div className='CartListItem__quantity-actual'>
            <span>
              <strong>{selectedItem.quantity}</strong> pkg.
            </span>
            <span>
              <small>US$ {price.toFixed(2)} / each</small>
            </span>
          </div>
          <div
            onClick={() => addItem(selectedItem)}
            className='CartListItem__quantity-increase'
          >
            <i className='fas fa-chevron-right'></i>
          </div>
        </div>
        <div className='CartListItem__price'>
          US$ {(selectedItem.quantity * price).toFixed(2)}
        </div>
        <div
          onClick={() => clearItem(selectedItem)}
          className='CartListItem__removeItem'
        >
          <i className='fas fa-times'></i>
        </div>
      </div>
      <hr className='CartListItem__hr' />
    </>
  );
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

export default connect(mapStateToProps, {
  removeItemFromCart,
  addItemToCart,
  clearItemFromCart,
})(CartListItem);
