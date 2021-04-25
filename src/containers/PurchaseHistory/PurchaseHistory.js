import React from 'react';

import PurchaseSummary from '../../components/PurchaseSummary/PurchaseSummary';
import './PurchaseHistory.scss';

const PurchaseHistory = () => {
  return (
    <div className='PurchaseHistory'>
      <h1>Purchase history</h1>
      <PurchaseSummary />
    </div>
  );
};

export default PurchaseHistory;
