import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../../../components/ListItem/ListItem';
import DB from '../../../assets/seedDB';

import './FavoritesView.scss';

const { fruits, vegetables } = DB;
let goodsToRender;
goodsToRender = [...fruits, ...vegetables];

const FavoritesView = ({ favorites, favoritesIsLoading, userIsLoading }) => {
  const filterFavorites = () => {
    let favoritesRender;
    // check if favorites are loaded and are not empty
    if (!favoritesIsLoading && !userIsLoading && !_.isEmpty(favorites)) {
      let fetchFavoriteItems = [];
      //used product name as identifier (should be Id, but uuid creates new Id each render)
      const favoriteItems = Object.entries(favorites)
        .filter((item) => item[1] !== undefined)
        .map((item) => item[1].product);

      for (let i = 0; i < favoriteItems.length; i++) {
        const favoriteItem = goodsToRender.filter(
          (item) => item.product === favoriteItems[i]
        );
        fetchFavoriteItems.push(favoriteItem);
      }

      favoritesRender = fetchFavoriteItems.flat().map((fruit) => {
        const id = uuidv4();

        const { product, url, description, price, discount } = fruit;

        return (
          <ListItem
            key={id}
            id={id}
            product={product}
            url={url}
            description={description}
            price={price}
            discount={discount}
          />
        );
      });
    }
    return favoritesRender ? favoritesRender : null;
  };
  return filterFavorites();
};

const mapStateToProps = ({ favorites, user }) => ({
  favorites: favorites?.favorites,
  favoritesIsLoading: favorites.loading,
  userIsLoading: user.isLoading,
});

export default connect(mapStateToProps)(FavoritesView);
