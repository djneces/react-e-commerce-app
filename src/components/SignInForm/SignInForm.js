import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SignInForm.scss';

import { loginCurrentUser } from '../../store/actions/user';
import { signInWithGoogle } from '../../firebase/firebaseUtils.js';

const SignInForm = ({ loginCurrentUser, loading, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginCurrentUser(formData, history);
    setFormData({ email: '', password: '' });
  };

  return (
    <div className='SignInForm'>
      <h1>Sign In</h1>
      <p>Sign In Your Account</p>
      <div className='SignInForm__login'>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <hr />
        <div className='SignInForm__socialBtn'>
          <button
            onClick={signInWithGoogle}
            className='SignInForm__btn--google'
          >
            <i className='fab fa-google'></i> Sign Up with Google
          </button>
        </div>
      </div>
      <div className='SignInForm__register'></div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
});

export default withRouter(
  connect(mapStateToProps, { loginCurrentUser })(SignInForm)
);
