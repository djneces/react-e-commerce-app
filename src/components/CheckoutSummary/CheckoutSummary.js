import React from 'react';
import { connect } from 'react-redux';

import SummaryListItem from '../CheckoutSummary/SummaryListItem/SummaryListItem';
import ShippingDetails from '../ShippingDetails/ShippingDetails';
import SignInForm from '../SignInForm/SignInForm';
import './CheckoutSummary.scss';

const CheckoutSummary = ({ selectedItems, isAuthenticated, isLoading }) => {
  const totalPrice = selectedItems
    .map((cartItem) => {
      const { price, quantity } = cartItem;
      return price * quantity;
    })
    .reduce((acc, item) => acc + item, 0);

  return (
    <>
      <div className='CheckoutSummary'>
        <h3>Summary of your order</h3>
        <div className='CheckoutSummary__orderList'>
          {selectedItems?.map((cartItem, i) => {
            const { id, product, description, price, url } = cartItem;
            const selectedItem = selectedItems.filter(
              (item) => item.id === id
            )[0];
            return (
              <SummaryListItem
                key={i}
                id={id}
                product={product}
                description={description}
                price={price}
                url={url}
                quantity={selectedItem.quantity}
              />
            );
          })}
        </div>
        <hr />
        <div className='CheckoutSummary__orderTotal'>
          <div>Order Total</div>
          <div>US$ {totalPrice.toFixed(2)}</div>
        </div>
      </div>
      <div className='ShippingForm'>
        {isAuthenticated && !isLoading ? (
          <>
            <h3>Shipping Details</h3>
            <ShippingDetails content='Continue to Payment' />
          </>
        ) : (
          <div className='ShippingForm__login'>
            <h3 id='redOutline'>Please login first</h3>
            <SignInForm />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ cart, user }) => ({
  selectedItems: cart.items,
  isAuthenticated: user.isAuthenticated,
  isLoading: user.isLoading,
});

export default connect(mapStateToProps)(CheckoutSummary);
