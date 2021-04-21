import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../../components/ListItem/ListItem';
import DB from '../../assets/seedDB';
import './LandingPage.scss';
const { fruits } = DB;

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      {fruits.map((fruit) => {
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
      })}
    </div>
  );
};

export default LandingPage;
