import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content, onclick, size, type, width } = props;
  return (
    <button
      className={`CustomBtn ${size === 'xl' ? 'large' : ''} ${
        width === '100' ? 'w-100' : ''
      }`}
      onClick={onclick}
      type={type}
    >
      {content}
    </button>
  );
};

export default CustomBtn;
