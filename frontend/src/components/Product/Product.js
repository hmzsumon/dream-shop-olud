import React from 'react';
import './Product.css';
import Rating from '../../components/Rating/Rating';

const Product = (props) => {
  const { img, name, price, seller, stock, features, star } = props.product;

  return (
    <div className="product-container">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-description">
        <div className="item-name">
          <a href="/shop">{name}</a>
        </div>
        <div className="items-description">
          <div className="description-left">
            <div>by: {seller}</div>
            <div className="price">$ {price}</div>
            <div className="stock">Only {stock} left in stock - order soon</div>
            <button
              className="button primary"
              onClick={() => props.handleAddProduct(props.product)}
            >
              {' '}
              <i className="fas fa-shopping-cart"></i>add to cart
            </button>
          </div>
          <div className="descrption-right">
            <div className="product-rating">
              <Rating value={star} />
            </div>
            <div className="features">
              <h4>Features:</h4>
              <ul>
                {features.map((pd, key) => (
                  <li key={key}>
                    {pd.description}: <strong>{pd.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
