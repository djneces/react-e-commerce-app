import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content, onclick } = props;
  return (
    <button className='CustomBtn' onClick={onclick}>
      {content}
    </button>
  );
};

export default CustomBtn;
