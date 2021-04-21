import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebaseUtils';
import { logoutCurrentUser } from '../../store/actions/user';
import { toggleAccountDetails } from '../../store/actions/accountDetails';

import './AccountDetails.scss';

const AccountDetails = ({ logoutCurrentUser, toggleAccountDetails }) => {
  const onSignOut = () => {
    auth.signOut();
    logoutCurrentUser();
  };

  const toggleDetails = () => {
    toggleAccountDetails();
  };
  return (
    <div className='AccountDetails' onMouseLeave={toggleDetails}>
      <div className='AccountDetails__header'>
        <h2>Account Details</h2>
      </div>
      <div onClick={onSignOut} className='AccountDetails__purchaseHistory'>
        <i className='fas fa-money-bill-wave'></i>
        Purchase History
      </div>
      <div onClick={onSignOut} className='AccountDetails__profile'>
        <i className='far fa-user-circle'></i>
        Profile
      </div>
      <div onClick={onSignOut} className='AccountDetails__signOut'>
        <i className='fas fa-sign-out-alt'></i>
        Sign Out
      </div>
    </div>
  );
};

export default connect(null, { logoutCurrentUser, toggleAccountDetails })(
  AccountDetails
);
