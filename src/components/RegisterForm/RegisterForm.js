import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './RegisterForm.scss';

import CustomBtn from '../CustomBtn/CustomBtn';
import { registerCurrentUser } from '../../store/actions/user';

const required = (value) => (value ? undefined : 'Required field');
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minValue = (min) => (value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;
const minValue6 = minValue(6);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class RegisterForm extends Component {
  componentDidMount() {}
  onSubmit = async (formValues) => {
    const { passwordRegistration, password2Registration } = formValues;
    if (passwordRegistration !== password2Registration) {
      alert("Passwords don't match");
      return;
    }
    const { history, registerCurrentUser } = this.props;

    registerCurrentUser(formValues, history);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='RegisterForm__error-body'>
          <div className='RegisterForm__error-message'> {error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, placeholder, type, meta }) => {
    return (
      <div className='RegisterForm__container-input'>
        <input
          className={`${meta.error && meta.touched ? 'errorOutline' : ''}`}
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete='off'
        />
        <div className='RegisterForm__error'>{this.renderError(meta)}</div>
      </div>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='RegisterForm'>
        <div className='RegisterForm__header'>
          <h1>Register</h1>
          <p>Create Your New Account</p>
        </div>

        <form
          className='RegisterForm__container'
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field
            name='displayName'
            type='text'
            validate={[minValue6, maxLength15]}
            component={this.renderInput}
            placeholder='Enter your name'
          />
          <Field
            name='emailRegistration'
            type='email'
            validate={[email, required]}
            component={this.renderInput}
            placeholder='Enter your email'
          />
          <Field
            name='passwordRegistration'
            type='password'
            validate={[required, minValue6, maxLength15]}
            component={this.renderInput}
            placeholder='Enter your password'
          />
          <Field
            name='password2Registration'
            type='password'
            validate={[required]}
            component={this.renderInput}
            placeholder='Confirm your password'
          />

          <CustomBtn content='Register' type='submit' size='xl' />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'registerForm',
})(withRouter(connect(null, { registerCurrentUser })(RegisterForm)));
