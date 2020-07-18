import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './checkoutForm.css';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const [didMount, setDidMount] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod);
      const payment = { id: paymentMethod.id, last4: paymentMethod.card.last4 };
      props.handleplaceOrder(payment);
      setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="payment-form">
        <li>
          <CardElement />
        </li>
        <li>
          <button className="button primary" type="submit" disabled={!stripe}>
            Pay
          </button>
        </li>
        <li>
          {paymentError && (
            <small className="payment-error">{paymentError}</small>
          )}
          {paymentSuccess && (
            <small className="payment-success">Payment Successfull</small>
          )}
        </li>
      </ul>
    </form>
  );
};
export default CheckoutForm;
