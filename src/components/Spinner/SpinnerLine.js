import React from 'react';
import './SpinnerLine.scss';

const SpinnerLine = () => {
  return (
    <div className='SpinnerLine lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SpinnerLine;
