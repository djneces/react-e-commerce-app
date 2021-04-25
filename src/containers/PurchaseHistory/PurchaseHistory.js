import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrderHistory } from '../../store/actions/orderHistory';
import PurchaseSummary from '../../components/PurchaseSummary/PurchaseSummary';
import SpinnerLine from '../../components/Spinner/SpinnerLine';
import './PurchaseHistory.scss';

class PurchaseHistory extends Component {
  async componentDidMount() {
    const { userId, fetchOrderHistory } = this.props;
    if (userId) {
      fetchOrderHistory(userId);
    }
  }
  render() {
    const { historyIsLoading } = this.props;

    return (
      <>
        <div className='PurchaseHistory'>
          <h1>Purchase history</h1>
          {historyIsLoading && <SpinnerLine />}
          <PurchaseSummary />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user, orderHistory }) => ({
  userId: user.currentUser?.userDbId,
  currentUser: user.currentUser,
  historyIsLoading: orderHistory.loading,
});

export default connect(mapStateToProps, { fetchOrderHistory })(PurchaseHistory);
