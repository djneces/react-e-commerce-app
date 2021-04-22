import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content, onclick, size } = props;
  return (
    <button
      className={`CustomBtn ${size === 'xl' ? 'large' : ''}`}
      onClick={onclick}
    >
      {content}
    </button>
  );
};

export default CustomBtn;
