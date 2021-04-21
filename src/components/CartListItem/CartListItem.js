import React from 'react';

import './CartListItem.scss';

const CartListItem = ({ product, description, price, url }) => {
  return (
    <>
      <div className='CartListItem'>
        <div className='CartListItem__image'>
          <img src={url} alt={product} />
        </div>
        <div className='CartListItem__details'>
          <div className='CartListItem__details-product'>{product}</div>
          <div className='CartListItem__details-description'>{description}</div>
          <div className='CartListItem__details-price'>{price}</div>
        </div>
      </div>
      {/* {cartItems.length > 1 && <hr />} */}
      <hr className='CartListItem__hr' />
    </>
  );
};

export default CartListItem;
