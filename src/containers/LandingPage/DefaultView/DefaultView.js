import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import DB from '../../../assets/seedDB';

import ListItem from '../../../components/ListItem/ListItem';
import './DefaultView.scss';

let { fruits, vegetables } = DB;

const DefaultView = ({
  sortByPriceUp,
  sortByPriceDown,
  showDeals,
  renderFruits,
  renderVeggies,
  searchTerm,
}) => {
  let goodsToRender;
  let seed;
  if (renderFruits) {
    //filter to filter out the term in the search bar
    seed = [...fruits].filter((item) => {
      if (searchTerm === undefined) return item;
      return item?.product
        .toLowerCase()
        .includes(searchTerm?.toLowerCase().trim());
    });
  } else if (renderVeggies) {
    seed = [...vegetables].filter((item) => {
      if (searchTerm === undefined) return item;
      return item?.product
        .toLowerCase()
        .includes(searchTerm?.toLowerCase().trim());
    });
  } else {
    seed = fruits;
  }

  //sorting by Price ascending
  if (sortByPriceUp) {
    goodsToRender = [...seed].sort((item1, item2) => item1.price - item2.price);
  } else if (sortByPriceDown) {
    //sorting by Price descending
    goodsToRender = [...seed].sort((item1, item2) => item2.price - item1.price);
  } else {
    goodsToRender = seed;
  }

  if (showDeals) {
    //show deals
    goodsToRender = seed.filter((item) => item.discount > 0);
  }

  const defaultRender = goodsToRender.map((fruit) => {
    const id = uuidv4();

    const { product, url, description, price, discount } = fruit;

    return (
      <ListItem
        key={id}
        id={id}
        product={product}
        url={url}
        description={description}
        price={price}
        discount={discount}
      />
    );
  });

  return defaultRender.length === 0 ? (
    <div className='LandingPage__body-ListItems--noRecords'>
      No results found, please try again.
    </div>
  ) : (
    defaultRender
  );
};

const mapStateToProps = ({ form }) => ({
  searchTerm: form.searchBarForm?.values?.searchBar,
});

export default connect(mapStateToProps)(DefaultView);
