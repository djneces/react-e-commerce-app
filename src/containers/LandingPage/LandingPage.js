import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import DefaultView from './DefaultView/DefaultView';
import FavoritesView from './FavoritesView/FavoritesView';
import CustomBtn from '../../components/CustomBtn/CustomBtn';

import heroImg from '../../assets/images/hero-img.jpg';

import './LandingPage.scss';

const LandingPage = ({ isAuthenticated, favorites, isFavoritesLoading }) => {
  const [sortByPriceDown, setSortByPriceDown] = useState(false);
  const [sortByPriceUp, setSortByPriceUp] = useState(false);
  const [favoritesToggled, setFavoritesToggled] = useState(false);
  const [dealsToggled, setDealsToggled] = useState(false);
  const [defaultView, setDefaultView] = useState(true);

  const [toggleFruits, setToggleFruits] = useState(true);
  const [toggleVeggies, setToggleVeggies] = useState(false);

  const sortByPriceAsc = () => {
    setSortByPriceDown(!sortByPriceDown);
    setSortByPriceUp(false);
  };

  const sortByPriceDesc = () => {
    setSortByPriceUp(!sortByPriceUp);
    setSortByPriceDown(false);
  };

  const sortByFavorites = () => {
    setFavoritesToggled(!favoritesToggled);
    setDefaultView(!defaultView);
  };

  const sortByDeals = () => {
    setDealsToggled(!dealsToggled);
  };

  const renderFruits = () => {
    setToggleFruits(!toggleFruits);
    setToggleVeggies(false);
  };

  const renderVeggies = () => {
    setToggleVeggies(!toggleVeggies);
    setToggleFruits(false);
  };

  return (
    <div className='LandingPage'>
      <div className='LandingPage__header'>
        <img src={heroImg} alt='fresh shop lading' />
      </div>
      <div className='LandingPage__body'>
        <div className='LandingPage__body-controls'>
          <div className='LandingPage__body-controls--button'>
            {!dealsToggled &&
              isAuthenticated &&
              !_.isEmpty(favorites) &&
              !isFavoritesLoading && (
                <CustomBtn
                  onclick={sortByFavorites}
                  content={
                    favoritesToggled ? 'Go Back to Menu' : 'Your favorites'
                  }
                  id={'menuBtnFav'}
                />
              )}

            {defaultView && !favoritesToggled && (
              <>
                <CustomBtn
                  onclick={sortByDeals}
                  content={dealsToggled ? 'Go Back to Menu' : 'Show deals'}
                  id={'menuBtnDeals'}
                />
              </>
            )}
          </div>
          <div className='LandingPage__body-controls--switchProduce'>
            {!favoritesToggled && (
              <>
                <div
                  onClick={renderFruits}
                  className={`${toggleFruits ? 'active' : ''}`}
                >
                  FRUITS
                </div>
                <div
                  onClick={renderVeggies}
                  className={`${toggleVeggies ? 'active' : ''}`}
                >
                  VEGETABLES
                </div>
              </>
            )}
          </div>
          {defaultView && !favoritesToggled && !dealsToggled && (
            <div className='LandingPage__body-sortPrice'>
              <span> Sort by Price</span>
              <span>
                <i
                  className='far fa-arrow-alt-circle-up'
                  onClick={sortByPriceAsc}
                ></i>
              </span>
              <span>
                <i
                  className='far fa-arrow-alt-circle-down'
                  onClick={sortByPriceDesc}
                ></i>
              </span>
            </div>
          )}
        </div>

        {defaultView && (
          <div className='LandingPage__body-ListItems'>
            <DefaultView
              sortByPriceDown={sortByPriceDown}
              sortByPriceUp={sortByPriceUp}
              showDeals={dealsToggled}
              renderFruits={toggleFruits}
              renderVeggies={toggleVeggies}
            />
          </div>
        )}
        {favoritesToggled && (
          <div className='LandingPage__body-ListItems'>
            <FavoritesView />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, favorites }) => ({
  isAuthenticated: user.isAuthenticated,
  favorites: favorites?.favorites,
  isFavoritesLoading: favorites.loading,
});

export default connect(mapStateToProps)(LandingPage);
