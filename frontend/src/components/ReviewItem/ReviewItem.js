import React from 'react';
import './ReviewItem.css';

import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
  const { img, name, quentity, key, price } = props.product;
  return (
    <div>
      <div className="review">
        <li>
          <img src={img} alt="" />
        </li>
        <li>
          <div className="name">
            <Link to="/shop">{name}</Link>
          </div>
          <div className="price">${price}</div>
          <div className="quentity">Quentity: {quentity}</div>
          <div>
            <button
              className="button primary"
              onClick={() => props.removeProduct(key)}
            >
              Remove
            </button>
          </div>
        </li>
      </div>
    </div>
  );
};

export default ReviewItem;
