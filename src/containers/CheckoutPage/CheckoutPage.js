import React from 'react';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import './CheckoutPage.scss';

const CheckoutPage = ({ selectedItems }) => {
  return (
    <div className='CheckoutPage'>
      <CheckoutSummary />
    </div>
  );
};

export default CheckoutPage;
