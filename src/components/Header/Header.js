import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import AccountDetails from '../AccountDetails/AccountDetails';
import CartDetails from '../CartDetails/CartDetails';
import { toggleAccountDetails } from '../../store/actions/accountDetails';
import { toggleCartMenu } from '../../store/actions/shoppingCart';

import shopIcon from '../../assets/images/shopIcon.png';
import './Header.scss';

const Header = ({
  currentUser,
  toggle,
  toggleAccountDetails,
  itemsCount,
  toggleCartMenu,
  toggleCart,
}) => {
  const toggleDetails = () => {
    if (toggleCart) toggleCartMenu();
    toggleAccountDetails();
  };

  const toggleCartDetails = () => {
    if (toggle) toggleDetails();
    toggleCartMenu();
  };
  return (
    <Fragment>
      {toggle && <AccountDetails />}
      {toggleCart && <CartDetails />}

      <div className='Header'>
        <Link to='/'>
          <div className='Header__logo'>
            <img src={shopIcon} alt='shop icon' />
          </div>
        </Link>
        <div className='Header__searchBar'>
          <SearchBar />
        </div>
        <div className='Header__wrapper'>
          {currentUser ? (
            <>
              <div className='Header__username'>
                <span>Welcome back </span>
                <span>{currentUser && currentUser.username}</span>
              </div>
              <div onClick={toggleCartDetails} className='Header__cartIcon'>
                <i className='fas fa-shopping-basket'></i>
                {itemsCount.length !== 0 && (
                  <div className='Header__cartIcon--itemCount'>
                    {itemsCount.length}
                  </div>
                )}
              </div>
            </>
          ) : null}
          <div className='Header__login'>
            {currentUser ? (
              <div
                onClick={toggleDetails}
                className='Header__login-accountDetails'
              >
                <i className='fas fa-user-circle'></i>
                <i className='arrowDown fas fa-chevron-down'></i>
              </div>
            ) : (
              <div className='Header__login-signIn'>
                <Link to='/login'>Sign In</Link>
                <i className='fas fa-sign-in-alt'></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ user, toggleMenu, cart }) => ({
  currentUser: user.currentUser,
  toggle: toggleMenu,
  itemsCount: cart.items,
  toggleCart: cart.toggle,
});

export default connect(mapStateToProps, {
  toggleAccountDetails,
  toggleCartMenu,
})(Header);
