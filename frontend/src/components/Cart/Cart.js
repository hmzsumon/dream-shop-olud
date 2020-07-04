import React from 'react';
import './Cart.css';

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
      <table>
        <tr>
          <td>Items:</td>
          <td>$ {price}</td>
        </tr>
        <tr>
          <td>Shipping & Handling:</td>
          <td>$ {shipping}</td>
        </tr>
        <tr>
          <td>Total before Tax:</td>
          <td>$ {beforeTax}</td>
        </tr>
        <tr>
          <td>Estimated Tax:</td>
          <td>$ {tax}</td>
        </tr>
        <tr className="total-row">
          <td>Order Total:</td>
          <td>$ {total}</td>
        </tr>
      </table>
    </div>
  );
};

export default Cart;
