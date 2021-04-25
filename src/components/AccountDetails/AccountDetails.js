import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../../store/actions/user';
import { toggleAccountDetails } from '../../store/actions/accountDetails';
import { clearAllPurchases } from '../../store/actions/purchase';
import { clearAllCart } from '../../store/actions/shoppingCart';

import './AccountDetails.scss';

const AccountDetails = ({
  logoutCurrentUser,
  toggleAccountDetails,
  clearAllCart,
  history,
  clearAllPurchases,
}) => {
  const onSignOut = () => {
    logoutCurrentUser(history);
    clearAllCart();
    toggleAccountDetails();
    clearAllPurchases();
  };

  const renderPurchaseHistory = () => {
    history.push('/orders');
  };

  const toggleDetails = () => {
    toggleAccountDetails();
  };
  return (
    <div className='AccountDetails' onMouseLeave={toggleDetails}>
      <div className='AccountDetails__header'>
        <h2>Account Details</h2>
      </div>
      <div
        onClick={renderPurchaseHistory}
        className='AccountDetails__purchaseHistory'
      >
        <i className='fas fa-money-bill-wave'></i>
        Purchase History
      </div>
      <div className='AccountDetails__profile'>
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

export default withRouter(
  connect(null, {
    logoutCurrentUser,
    toggleAccountDetails,
    clearAllCart,
    clearAllPurchases,
  })(AccountDetails)
);
