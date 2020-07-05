import React, { useState, useEffect } from 'react';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './revew.css';

const Review = () => {
  const [cart, setCart] = useState([]);

  const removeProduct = (productKey) => {
    console.log('remove', productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    // cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quentity = saveCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  return (
    <div className="review-container">
      <div className="review-items">
        {cart.map((pd, key) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={key}
            product={pd}
          ></ReviewItem>
        ))}
      </div>
      <div className="review-cart">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Review;
