import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content, onclick, size, type, width, id } = props;
  return (
    <button
      className={`CustomBtn ${size === 'xl' ? 'large' : ''} ${
        width === '100' ? 'w-100' : ''
      }`}
      onClick={onclick}
      type={type}
      id={id}
    >
      {content}
    </button>
  );
};

export default CustomBtn;
