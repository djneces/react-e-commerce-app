import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SignInForm.scss';

import CustomBtn from '../CustomBtn/CustomBtn';
import Checkmark from '../Checkmark/Checkmark';

import { loginCurrentUser, signInGoogle } from '../../store/actions/user';
// import { signInWithGoogle } from '../../firebase/firebaseUtils.js';

const required = (value) => (value ? undefined : 'Required');
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class SignInForm extends Component {
  onSubmit = (formValues) => {
    const { loginCurrentUser, history, location } = this.props;
    loginCurrentUser(formValues, history, location);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='SignInForm__error-body'>
          <div className='SignInForm__error-message'> {error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, placeholder, type, meta }) => {
    return (
      <div className='SignInForm__container-input'>
        <input
          className={`${meta.error && meta.touched ? 'errorOutline' : ''}`}
          {...input}
          placeholder={placeholder}
          type={type}
          // autoComplete='off'
        />
        <div className='SignInForm__error'>{this.renderError(meta)}</div>
      </div>
    );
  };

  render() {
    const {
      handleSubmit,
      isLoading,
      signInGoogle,
      isTouched,
      formValues,
    } = this.props;

    return (
      <div className='SignInForm'>
        <div className='SignInForm__header'>
          <h1>Sign In</h1>
          <p>Your Account</p>
        </div>

        <form
          className='SignInForm__container'
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field
            name='email'
            type='email'
            validate={[email, required]}
            component={this.renderInput}
            placeholder='Enter your email'
          />
          <Field
            name='password'
            type='password'
            validate={[required]}
            component={this.renderInput}
            placeholder='Enter your password'
          />
          <div className='SignInForm__loginBtn'>
            <CustomBtn content='Login' size='xl' width='100' />
            {isLoading && isTouched && formValues !== undefined && (
              <Checkmark />
            )}
          </div>
        </form>

        <div className='SignInForm__socialBtn'>
          <button
            onClick={signInGoogle}
            className='SignInForm__socialBtn-google'
          >
            <i className='fab fa-google'></i> Sign Up with Google
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user, form }) => ({
  isLoading: user.isLoading,
  isTouched: form?.signInForm?.anyTouched,
  formValues: form?.signInForm?.values,
});

export default reduxForm({
  form: 'signInForm',
})(
  withRouter(
    connect(mapStateToProps, { loginCurrentUser, signInGoogle })(SignInForm)
  )
);
