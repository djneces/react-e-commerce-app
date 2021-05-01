/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { connect } from 'react-redux';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/actions/favorites';
import './FavoritesHeart.scss';

const FavoritesHeart = ({
  isAuthenticated,
  product,
  item,
  favoritesIsLoading,
  userIsLoading,
  favorites,
  userId,
  addToFavorites,
  removeFromFavorites,
}) => {
  //use usestateref to pass the actual state
  const [isToggled, setIsToggled, refToggled] = useState(false);
  const [isHovered, setIsHovered, refHovered] = useState(false);

  let favoriteDbId;

  useEffect(() => {
    //setting up isToggled to true for the favorites fetched from the DB
    if (!favoritesIsLoading && favoriteDbId?.length > 0) {
      setIsToggled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesIsLoading, favoriteDbId]);

  // check if favorites are loaded and are not empty
  if (!favoritesIsLoading && !userIsLoading && !_.isEmpty(favorites)) {
    //used product name as identifier (should be Id, but uuid creates new Id each render)
    favoriteDbId = Object.entries(favorites).filter(
      (item) => item[1] !== undefined && item[1].product === product
    );
    // console.log(favoriteDbId);
  }

  const addOrDeleteFavorite = (toggled, item) => {
    if (toggled.current) {
      addToFavorites(userId, item);
    }
    if (!toggled.current) {
      removeFromFavorites(userId, favoriteDbId[0][0]);
    }
  };

  const onClickHandle = () => {
    // //toggle the icon only when authenticated
    if (isAuthenticated) {
      setIsToggled(() => !isToggled);
      addOrDeleteFavorite(refToggled, item);
    }
  };

  //setting up the style of the heart icon
  const iconClass =
    favoriteDbId?.length > 0
      ? 'fas fa-heart red'
      : refHovered.current
      ? 'fas fa-heart red'
      : refToggled.current && isAuthenticated
      ? 'fas fa-heart red'
      : refToggled.current && refHovered.current && isAuthenticated
      ? 'fas fa-heart red'
      : 'far fa-heart';
  return (
    <div className='FavoritesHeart-fav'>
      <i
        className={iconClass}
        onMouseEnter={() => setIsHovered((prevState) => !prevState)}
        onMouseLeave={() => setIsHovered((prevState) => !prevState)}
        onClick={onClickHandle}
      ></i>
    </div>
  );
};

const mapStateToProps = ({ user, favorites }) => ({
  isAuthenticated: user.isAuthenticated,
  userId: user.currentUser?.userDbId,
  userIsLoading: user.isLoading,
  favoritesIsLoading: favorites.loading,
  favorites: favorites?.favorites,
});

export default connect(mapStateToProps, {
  addToFavorites,
  removeFromFavorites,
})(FavoritesHeart);
