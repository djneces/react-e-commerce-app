import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import CustomBtn from '../CustomBtn/CustomBtn';
import CartListItem from '../CartListItem/CartListItem';
import { toggleCartMenu } from '../../store/actions/shoppingCart';

import './CartDetails.scss';

class CartDetails extends Component {
  targetRef = React.createRef();
  targetElement = null;

  componentDidMount() {
    this.targetElement = this.targetRef.current;
  }
  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  toggleCartDetails = () => {
    enableBodyScroll(this.targetElement);
    this.props.toggleCartMenu();
  };

  noScrollOnBody = () => {
    disableBodyScroll(this.targetElement);
  };

  proceedToCheckout = () => {
    this.props.history.push('/checkout');
    this.props.toggleCartMenu();
  };

  render() {
    const { cartItems } = this.props;
    const totalPrice = cartItems
      .map((cartItem) => {
        const { price, quantity } = cartItem;
        return price * quantity;
      })
      .reduce((acc, item) => acc + item, 0);
    return (
      <div
        className='CartDetails'
        ref={this.targetRef}
        onMouseLeave={this.toggleCartDetails}
        onMouseEnter={this.noScrollOnBody}
      >
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
          {cartItems.length > 0 ? (
            <CustomBtn
              content='PROCEED TO CHECKOUT'
              onclick={this.proceedToCheckout}
              size='xl'
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

export default withRouter(
  connect(mapStateToProps, { toggleCartMenu })(CartDetails)
);
