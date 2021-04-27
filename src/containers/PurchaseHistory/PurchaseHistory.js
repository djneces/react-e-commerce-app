import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrderHistory } from '../../store/actions/orderHistory';
import PurchaseSummary from '../../components/PurchaseSummary/PurchaseSummary';
import SpinnerLine from '../../components/Spinner/SpinnerLine';
import './PurchaseHistory.scss';

class PurchaseHistory extends Component {
  componentDidMount() {
    const { userId, fetchOrderHistory, orderHistory } = this.props;
    //loading only when orderHistory is empty
    if (userId && orderHistory.length === 0) {
      fetchOrderHistory(userId);
    }
  }
  render() {
    const { historyIsLoading, orderHistory } = this.props;

    return (
      <>
        <div className='PurchaseHistory'>
          <h1>Purchase history</h1>
          {historyIsLoading && <SpinnerLine />}
          {orderHistory.length > 0 && !historyIsLoading ? (
            <PurchaseSummary />
          ) : (
            <div className='PurchaseHistory__noRecords'>
              You don't have any history at the moment
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user, orderHistory }) => ({
  userId: user.currentUser?.userDbId,
  currentUser: user.currentUser,
  historyIsLoading: orderHistory.loading,
  orderHistory: orderHistory.orderHistory,
});

export default connect(mapStateToProps, { fetchOrderHistory })(PurchaseHistory);
