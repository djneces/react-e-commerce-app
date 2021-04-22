import React from 'react';
import { connect } from 'react-redux';

import './SummaryListItem.scss';

const SummaryListItem = ({
  product,
  description,
  price,
  url,
  id,
  cartItems,
}) => {
  const selectedItem = cartItems.filter((item) => item.id === id)[0];

  return (
    <>
      <div className='SummaryListItem'>
        <div className='SummaryListItem__image'>
          <img src={url} alt={product} />
        </div>
        <div className='SummaryListItem__details'>
          <div className='SummaryListItem__details-product'>{product}</div>
          <div className='SummaryListItem__details-description'>
            {description}
          </div>
        </div>

        <div className='SummaryListItem__price'>
          <div className='SummaryListItem__price-quantity'>
            <small>{`${selectedItem.quantity} * US$ ${price.toFixed(
              2
            )}`}</small>
          </div>
          <div className='SummaryListItem__price-totalPrice'>
            US$ {(selectedItem.quantity * price).toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

export default connect(mapStateToProps)(SummaryListItem);
