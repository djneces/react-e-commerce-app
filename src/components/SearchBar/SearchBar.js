import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import './SearchBar.scss';

class SearchBar extends Component {
  renderInput = ({ input, placeholder, type }) => {
    return (
      <div className='SearchBar'>
        <input {...input} placeholder={placeholder} type={type} />
      </div>
    );
  };

  render() {
    return (
      <form className='SearchBar'>
        <Field
          name='searchBar'
          type='text'
          placeholder='Search the store...'
          component={this.renderInput}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'searchBarForm',
})(SearchBar);
