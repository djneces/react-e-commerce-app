import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './RegisterForm.scss';

import {
  createUserProfileDocument,
  auth,
} from '../../firebase/firebaseUtils.js';
import { registerCurrentUser } from '../../store/actions/user';

const RegisterForm = ({ history, registerCurrentUser }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    password2: '',
  });
  const { email, password, password2, displayName } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password don't match");
    }

    registerCurrentUser(formData, history);
    setFormData({ displayName: '', email: '', password: '', password2: '' });
  };

  return (
    <div className='RegisterForm'>
      <h1>Register</h1>
      <p>Create Your New Account</p>
      <div className='RegisterForm__login'>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            placeholder='Enter your name'
            name='displayName'
            value={displayName}
            onChange={(e) => onChange(e)}
            required
          />
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
          <input
            type='password'
            placeholder='Confirm your password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
      </div>
      <div className='RegisterForm__register'></div>
    </div>
  );
};

export default withRouter(connect(null, { registerCurrentUser })(RegisterForm));
