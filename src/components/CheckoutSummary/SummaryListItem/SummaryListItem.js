import React from 'react';

import './SummaryListItem.scss';

const SummaryListItem = ({
  product,
  description,
  price,
  url,
  id,
  quantity,
}) => {
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
            <small>{`${quantity} * US$ ${price.toFixed(2)}`}</small>
          </div>
          <div className='SummaryListItem__price-totalPrice'>
            US$ {(quantity * price).toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryListItem;
