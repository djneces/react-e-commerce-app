import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SummaryListItem from '../CheckoutSummary/SummaryListItem/SummaryListItem';
import './PurchaseSummary.scss';

const PurchaseSummary = ({ orderHistory }) => {
  const orders = orderHistory.map((item, i) => {
    const { createdAt, orderItems } = item;
    let totalPrice = 0;
    const items = orderItems.map((item) => {
      const { id, product, description, price, url, quantity } = item;
      totalPrice += price * quantity;

      return (
        <SummaryListItem
          key={id}
          id={id}
          product={product}
          description={description}
          price={price}
          url={url}
          quantity={quantity}
        />
      );
    });
    return (
      <div className='PurchaseSummary__order' key={i}>
        <div className='PurchaseSummary__timeStamp'>
          <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
          <span>{moment(createdAt).startOf('day').fromNow()}</span>
        </div>
        <div className='PurchaseSummary__orderDetails'>{items}</div>
        <div className='PurchaseSummary__priceTotal'>
          <span>Total amount:</span>
          <span>{`US$ ${totalPrice.toFixed(2)}`}</span>
        </div>
      </div>
    );
  });

  return <div className='PurchaseSummary'>{orders}</div>;
};
const mapStateToProps = ({ orderHistory }) => ({
  orderHistory: orderHistory.orderHistory,
});

export default connect(mapStateToProps)(PurchaseSummary);
