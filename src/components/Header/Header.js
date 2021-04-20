import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import { auth } from '../../firebase/firebaseUtils';
import { logoutCurrentUser } from '../../store/actions/user';

import shopIcon from '../../assets/images/shopIcon.png';
import './Header.scss';

const Header = ({ currentUser, logoutCurrentUser }) => {
  const onSignOut = () => {
    auth.signOut();
    logoutCurrentUser();
  };
  return (
    <div className='Header'>
      <div className='Header__logo'>
        <img src={shopIcon} alt='shop icon' />
      </div>
      <div className='Header__searchBar'>
        <SearchBar />
      </div>
      <div className='Header__wrapper'>
        {currentUser ? (
          <>
            <div className='Header__cartIcon'>
              <i className='fas fa-shopping-cart'></i>
            </div>
            <div className='Header__username'>
              <span>Welcome back </span>
              <span>{currentUser && currentUser.username}</span>
            </div>
          </>
        ) : null}
        <div className='Header__login'>
          {currentUser ? (
            <div onClick={onSignOut}>Sign Out</div>
          ) : (
            <div className='Header__login-signIn'>
              <Link to='/login'>Sign In</Link>
              <i className='fas fa-sign-in-alt'></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { logoutCurrentUser })(Header);
