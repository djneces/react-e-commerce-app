import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content, onclick, size, type } = props;
  return (
    <button
      className={`CustomBtn ${size === 'xl' ? 'large' : ''}`}
      onClick={onclick}
      type={type}
    >
      {content}
    </button>
  );
};

export default CustomBtn;
