import React from 'react';
import { connect } from 'react-redux';

import { addItemToCart } from '../../store/actions/shoppingCart';
import CustomBtn from '../CustomBtn/CustomBtn';
import FavoritesHeart from '../../components/FavoritesHeart/FavoritesHeart';
import './ListItem.scss';

const ListItem = ({
  id,
  product,
  url,
  description,
  price,
  discount,
  addItemToCart,
  isAuthenticated,
}) => {
  const item = { id, product, description, price, url };

  const addItem = () => {
    addItemToCart(item);
  };

  return (
    <div className='ListItem'>
      <div className='ListItem__cardHeader'>
        {discount !== 0 && (
          <div className='ListItem__cardHeader-discount'>{`${discount}% OFF`}</div>
        )}
        {isAuthenticated && <FavoritesHeart product={product} item={item} />}
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
        <CustomBtn content='Add to Cart' onclick={addItem} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, {
  addItemToCart,
})(ListItem);
