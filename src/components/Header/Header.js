import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SearchBar from '../SearchBar/SearchBar';
import { auth } from '../../firebase/firebaseUtils';

const Header = ({ currentUser }) => {
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
            <div onClick={() => auth.signOut()}>Sign Out</div>
          ) : (
            <Link to='/login'>Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
