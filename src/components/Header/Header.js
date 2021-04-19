import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import { auth } from '../../firebase/firebaseUtils';
import { logoutCurrentUser } from '../../store/actions/user';
import './Header.scss';

const Header = ({ currentUser, logoutCurrentUser }) => {
  const onSignOut = () => {
    auth.signOut();
    logoutCurrentUser();
  };
  return (
    <div className='Header'>
      <div className='Header__logo'>MyShopApp</div>
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
        <div className='Header__loginBtn'>
          {currentUser ? (
            <div onClick={onSignOut}>Sign Out</div>
          ) : (
            <Link to='/login'>Sign In</Link>
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
