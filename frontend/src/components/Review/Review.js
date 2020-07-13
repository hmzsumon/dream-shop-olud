import React, { useState, useEffect } from 'react';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  // processOrder,
} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './revew.css';
import happyimg from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [placeOrder] = useState(false);
  const auth = useAuth();

  // const handlePlaceOrder = () => {
  //   setCart([]);
  //   setPlaceOrder(true);
  //   processOrder();
  // };

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

  let thankyou;
  if (placeOrder) {
    thankyou = <img src={happyimg} alt="" />;
  }
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
        {thankyou}
        {!cart.length && (
          <h2>
            Your Cart is empty. <Link to="/shop">Keep Shopping</Link>
          </h2>
        )}
      </div>

      <div className="review-cart">
        <Cart cart={cart}>
          <Link to="/shipment">
            {auth.user ? (
              <button className="button primary">Proceed to Checkout</button>
            ) : (
              <button className="button primary"> LogIn to Proceed</button>
            )}
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
