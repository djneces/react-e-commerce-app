import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import './SignInPage.scss';

const SignInPage = () => {
  return (
    <div className='SignInPage'>
      <SignInForm />
      <RegisterForm />
    </div>
  );
};

export default SignInPage;
