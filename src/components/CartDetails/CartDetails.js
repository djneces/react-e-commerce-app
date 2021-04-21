import React from 'react';
import { connect } from 'react-redux';

import CartListItem from '../CartListItem/CartListItem';
import { toggleCartMenu } from '../../store/actions/shoppingCart';

import './CartDetails.scss';

const CartDetails = ({ toggleCartMenu, cartItems }) => {
  const toggleCartDetails = () => {
    toggleCartMenu();
  };
  return (
    <div className='CartDetails' onMouseLeave={toggleCartDetails}>
      <div className='CartDetails__header'>
        <h2>Your Cart</h2>
      </div>
      {cartItems.length > 0 ? (
        <div className='CartDetails__body'>
          {cartItems.map((cartItem, i) => {
            const { description, product, price, url } = cartItem;
            return (
              <CartListItem
                key={i}
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
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

export default connect(mapStateToProps, { toggleCartMenu })(CartDetails);
