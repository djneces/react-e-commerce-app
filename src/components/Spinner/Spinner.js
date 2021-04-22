import React from 'react';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='Spinner lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
