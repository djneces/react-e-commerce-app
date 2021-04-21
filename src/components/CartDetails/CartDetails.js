import React from 'react';
import { connect } from 'react-redux';

import CartListItem from '../CartListItem/CartListItem';
import { toggleCartMenu } from '../../store/actions/shoppingCart';

import './CartDetails.scss';

const CartDetails = ({ toggleCartMenu, cartItems }) => {
  const toggleCartDetails = () => {
    toggleCartMenu();
  };

  const totalPrice = cartItems
    .map((cartItem) => {
      const { price, quantity } = cartItem;
      return price * quantity;
    })
    .reduce((acc, item) => acc + item, 0);

  return (
    <div className='CartDetails' onMouseLeave={toggleCartDetails}>
      <div className='CartDetails__header'>
        <h2>Your Cart</h2>
      </div>
      {cartItems.length > 0 ? (
        <div className='CartDetails__body'>
          {cartItems.map((cartItem, i) => {
            const { description, product, price, url, id } = cartItem;
            return (
              <CartListItem
                key={i}
                id={id}
                product={product}
                description={description}
                price={price}
                url={url}
              />
            );
          })}
        </div>
      ) : (
        <div className='CartDetails__emptyCart'>Your cart is empty</div>
      )}
      <div className='CartDetails__footer'>
        <h2>Your Total: US$ {totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

export default connect(mapStateToProps, { toggleCartMenu })(CartDetails);
