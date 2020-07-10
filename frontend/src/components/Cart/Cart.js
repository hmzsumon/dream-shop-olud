import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
  const cart = props.cart;
  let price = 0;
  let shipping = 0;
  let beforeTax = 0;
  let tax = 0;
  let total = 0;

  const roundToDecimal = (number) => {
    return Math.round(number * 100) / 100;
  };
  const itemPrice = cart.reduce(
    (prev, item) => item.price * (item.quantity || 1) + prev,
    0
  );
  const shippingPrice = cart.reduce(
    (prev, item) => item.shipping * (item.quentity || 1) + prev,
    0
  );
  price = roundToDecimal(itemPrice);
  shipping = roundToDecimal(shippingPrice);
  beforeTax = roundToDecimal(price + shipping);
  tax = roundToDecimal((price + shipping) * 0.1);
  total = roundToDecimal(price + shipping + tax);

  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Items Ordered: {cart.length}</p>
      <div className="summary">
        <li className="title">
          <div>Items:</div>
          <div>Price:</div>
        </li>

        <li>
          <div>Items Price:</div>
          <div>$ {price}</div>
        </li>
        <li>
          <div>Shipping & Hendling:</div>
          <div>$ {shipping}</div>
        </li>
        <li>
          <div>Bfore Tax:</div>
          <div>$ {beforeTax}</div>
        </li>
        <li>
          <div>Tax:</div>
          <div>$ {tax}</div>
        </li>
        <li className="total">
          <div>Total:</div>
          <div>$ {total}</div>
        </li>
      </div>

      {props.children}
    </div>
  );
};

export default Cart;
