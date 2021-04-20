import React from 'react';
import './CustomBtn.scss';

const CustomBtn = (props) => {
  const { content } = props;
  return <button className='CustomBtn'>{content}</button>;
};

export default CustomBtn;
