import React from 'react';
import { connect } from 'react-redux';

import SummaryListItem from '../CheckoutSummary/SummaryListItem/SummaryListItem';
import './CheckoutSummary.scss';

const CheckoutSummary = ({ selectedItems }) => {
  const totalPrice = selectedItems
    .map((cartItem) => {
      const { price, quantity } = cartItem;
      return price * quantity;
    })
    .reduce((acc, item) => acc + item, 0);
  return (
    <div className='CheckoutSummary'>
      <h3>Summary of your order</h3>
      <div className='CheckoutSummary__orderList'>
        {selectedItems?.map((cartItem, i) => {
          const { id, product, description, price, url } = cartItem;
          return (
            <SummaryListItem
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
      <hr />
      <div className='CheckoutSummary__orderTotal'>
        <div>Order Total</div>
        <div>{totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({
  selectedItems: cart.items,
});

export default connect(mapStateToProps)(CheckoutSummary);
