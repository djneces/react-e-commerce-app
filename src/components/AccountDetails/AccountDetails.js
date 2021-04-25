import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../../store/actions/user';
import { toggleAccountDetails } from '../../store/actions/accountDetails';
import { fetchOrderHistory } from '../../store/actions/orderHistory';
import { clearAllCart } from '../../store/actions/shoppingCart';

import './AccountDetails.scss';

const AccountDetails = ({
  logoutCurrentUser,
  toggleAccountDetails,
  clearAllCart,
  history,
  fetchOrderHistory,
  userId,
}) => {
  const onSignOut = () => {
    logoutCurrentUser(history);
    clearAllCart();
    toggleAccountDetails();
  };

  const renderPurchaseHistory = () => {
    fetchOrderHistory(userId);
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

const mapStateToProps = ({ user }) => ({
  userId: user.currentUser?.userDbId,
});

export default withRouter(
  connect(mapStateToProps, {
    logoutCurrentUser,
    toggleAccountDetails,
    clearAllCart,
    fetchOrderHistory,
  })(AccountDetails)
);
