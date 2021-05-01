import React from 'react';
import './Footer.scss';

const Footer = () => {
  const date = new Date().getFullYear();
  return <div className='Footer'>&copy; Jiri Necesanek, {date}</div>;
};

export default Footer;
