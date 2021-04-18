import React, { useState } from 'react';
import './RegisterForm.scss';

import {
  createUserProfileDocument,
  auth,
} from '../../firebase/firebaseUtils.js';

const RegisterForm = () => {
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

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      setFormData({ displayName: '', email: '', password: '', password2: '' });
    } catch (err) {
      console.error(err);
    }
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

export default RegisterForm;
