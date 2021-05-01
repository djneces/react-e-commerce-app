import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAlert } from '../../store/actions/alert';
import { updateContactDetails } from '../../store/actions/user';
import { createOrder } from '../../store/actions/purchase';
import CustomBtn from '../CustomBtn/CustomBtn';
import SpinnerLine from '../Spinner/SpinnerLine';
import './ShippingDetails.scss';

const required = (value) => (value ? undefined : 'Required field');
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = (min) => (value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;
const minLength3 = minLength(3);
const number = (value) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class ShippingDetails extends Component {
  onSubmit = async (formValues) => {
    const {
      updateContactDetails,
      createOrder,
      cartItems,
      currentUser,
      userDbId,
      history,
      location,
    } = this.props;
    const userData = { ...currentUser, contactDetails: formValues };
    updateContactDetails(userData, userDbId, location);

    //sends order to the DB only from /checkout (form is used in ProfilePage to update contact details too)
    if (location.pathname === '/checkout') {
      const orderData = { orderItems: cartItems, createdAt: new Date() };
      createOrder(orderData, userDbId, history);
    }
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ShippingDetails__error-body'>
          <div className='ShippingDetails__error-message'> {error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, className, placeholder, type, meta }) => {
    return (
      <div
        className={`ShippingDetails__container-input ${
          className ? className : ''
        }`}
      >
        <input
          className={`${meta.error && meta.touched ? 'errorOutline' : ''}`}
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete='off'
        />
        <label>{label}</label>
        <div className='ShippingDetails__error'>{this.renderError(meta)}</div>
      </div>
    );
  };
  render() {
    const { handleSubmit, purchaseLoading, content } = this.props;

    return (
      <div className='ShippingDetails'>
        <form
          className='ShippingDetails__container'
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field
            name='tel'
            type='tel'
            validate={[required, number]}
            component={this.renderInput}
            label='Enter your phone number'
            placeholder='Enter your phone number'
          />
          <div className='ShippingDetails__container-heading'>
            <h4>Delivery Address & Contact Details</h4>
            <small>
              Please fill out your exact address for timely delivery
            </small>
          </div>
          <div className='ShippingDetails__container-name'>
            <Field
              name='firstName'
              type='text'
              validate={[required, minLength3, maxLength15]}
              component={this.renderInput}
              label='First Name'
              placeholder='First Name'
              className='first'
            />
            <Field
              name='lastName'
              type='text'
              validate={[required, minLength3, maxLength15]}
              component={this.renderInput}
              label='Last Name'
              placeholder='Last Name'
              className='last'
            />
          </div>

          <Field
            name='addressLine1'
            type='text'
            validate={[required, minLength3]}
            component={this.renderInput}
            label='Address Line 1 (House No., Building)'
            placeholder='Address Line 1 (House No., Building)'
          />
          <Field
            name='addressLine2'
            type='text'
            // validate={[required]}
            component={this.renderInput}
            label='Address Line 2 (Street, Location)'
            placeholder='Address Line 2 (Street, Location)'
          />
          <Field
            name='addressZip'
            type='text'
            validate={[required]}
            component={this.renderInput}
            label='Zip code'
            placeholder='Zip code'
          />
          <Field
            name='addressCity'
            type='text'
            validate={[required]}
            component={this.renderInput}
            label='City'
            placeholder='City'
          />
          <div className='ShippingDetails__container-continueBtn'>
            <CustomBtn content={content} type='submit' size='xl' width='100' />
            {purchaseLoading && <SpinnerLine />}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart, purchase }) => ({
  currentUser: user.currentUser,
  cartItems: cart.items,
  userDbId: user.currentUser?.userDbId,
  purchaseLoading: purchase.loading,
  initialValues: user?.contactDetails,
});

const componentWithForm = reduxForm({
  form: 'shippingDetailsForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ShippingDetails);

export default withRouter(
  connect(mapStateToProps, { setAlert, updateContactDetails, createOrder })(
    componentWithForm
  )
);
