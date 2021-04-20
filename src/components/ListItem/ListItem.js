import React, { useState } from 'react';
import './ListItem.scss';

import CustomBtn from '../CustomBtn/CustomBtn';

const ListItem = ({ product, url, description, price, discount }) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => {
    setIsHovered(!isHovered);
  };
  return (
    <div className='ListItem'>
      <div className='ListItem__cardHeader'>
        {discount !== 0 && (
          <div className='ListItem__cardHeader-discount'>{`${discount}% OFF`}</div>
        )}

        <div className='ListItem__cardHeader-fav'>
          <i
            className={isHovered ? 'fas fa-heart' : 'far fa-heart'}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
          ></i>
        </div>
      </div>
      <div className='ListItem__cardBody'>
        <div className='ListItem__cardBody-image'>
          <img src={url} alt={product} />
        </div>
        <div className='ListItem__cardBody-itemName'>
          {`${product.split('')[0].toUpperCase()}${product.slice(1)}`}
        </div>
        <div className='ListItem__cardBody-itemDescription'>{description}</div>
        <div className='ListItem__cardBody-itemPrice'>
          <div className='ListItem__cardBody-itemPrice--regular'>{`US$ ${price.toFixed(
            2
          )}`}</div>
          {discount !== 0 && (
            <div className='ListItem__cardBody-itemPrice--discount'>{`US$ ${(
              price /
              (1 - discount / 100)
            ).toFixed(2)}`}</div>
          )}
        </div>
      </div>
      <div className='ListItem__cardFooter'>
        <CustomBtn content='Add to Cart' />
      </div>
    </div>
  );
};

export default ListItem;
