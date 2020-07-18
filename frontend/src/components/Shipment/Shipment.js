import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../checkoutForm/checkoutForm';

const Shipment = () => {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const stripePromise = loadStripe(
    'pk_test_51H5aTtERG3pC1iKYYA7blXv14MVLsZlUY1BC8hexOrpzEWFdi09R3361Phnj4pS7Sls0fqySkiYdX1fZ7PtOCued00aq3Vb5wn'
  );

  //submit handler
  const onSubmit = (data) => {
    setShipInfo(data);
  };

  const handleplaceOrder = (payment) => {
    //TODO: Move this aftr payment
    const sevedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: sevedCart,
      shipment: shipInfo,
      payment: payment,
    };
    fetch('http://localhost:4200/placeOrder', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderId(order._id);
        processOrder();
      });
  };

  return (
    <div className="shipment-wrapper">
      {/* START ORDER */}
      <div style={{ display: shipInfo && 'none' }} className="order-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Billing Address</h3>
          <ul className="order-form">
            <li>
              <label htmlFor="name">
                {' '}
                <i className="fa fa-user" aria-hidden="true"></i> Full Nmae:
              </label>
              <input
                name="name"
                ref={register({ required: true })}
                placeholder="name:"
                defaultValue={auth.user.name}
              />
              {errors.name && (
                <span className="ship-error">Name is required</span>
              )}
            </li>
            <li>
              <div>
                <label htmlFor="email">
                  {' '}
                  <i className="fa fa-envelope" aria-hidden="true"></i> Email:
                </label>
                <input
                  name="email"
                  ref={register({ required: true })}
                  placeholder="email:"
                  defaultValue={auth.user.email}
                />
                {errors.email && (
                  <span className="ship-error">Email is required</span>
                )}
              </div>
              <div>
                <label htmlFor="mobileNum">
                  {' '}
                  <i className="fa fa-phone" aria-hidden="true"></i> Number:
                </label>
                <input
                  name="mobileNum"
                  ref={register({ required: true })}
                  placeholder="mobile number:"
                />
                {errors.mobileNum && (
                  <span className="ship-error">Mobile Number is required</span>
                )}
              </div>
            </li>

            <li>
              <label htmlFor="addressLine1">
                {' '}
                <i className="fa fa-address-card" aria-hidden="true"></i>{' '}
                Address1:
              </label>
              <input
                name="addressLine1"
                ref={register({ required: true })}
                placeholder="addressLine1:"
              />
              {errors.addressLine1 && (
                <span className="ship-error">Address Line 1 is required</span>
              )}
            </li>

            <li>
              <label htmlFor="addressLine2">
                {' '}
                <i className="fa fa-address-card" aria-hidden="true"></i>{' '}
                Address2 (Optional):
              </label>
              <input
                name="addressLine2"
                ref={register}
                placeholder="addresslin2:"
              />
            </li>

            <li>
              <label htmlFor="addressLine2">
                {' '}
                <i className="fa fa-globe" aria-hidden="true"></i> Country:
              </label>
              <input
                name="country"
                ref={register({ required: true })}
                placeholder="country:"
              />
              {errors.country && (
                <span className="ship-error">Country is required</span>
              )}
            </li>

            <li>
              <div>
                <label htmlFor="city">City:</label>
                <input
                  name="city"
                  ref={register({ required: true })}
                  placeholder="city:"
                />
                {errors.city && (
                  <span className="ship-error">City is required</span>
                )}
              </div>
              <div>
                <label htmlFor="zipCode">Zip:</label>
                <input
                  name="zipCode"
                  ref={register({ required: true })}
                  placeholder="zipp code:"
                />
                {errors.zipCode && (
                  <span className="ship-error">Zip Code is required</span>
                )}
              </div>
            </li>

            <li className="submit">
              <button className="button primary" type="submit">
                Submit
              </button>
            </li>
          </ul>
        </form>
      </div>

      {/* PAYMENT FORM */}
      <div
        style={{ display: shipInfo ? 'block' : 'none' }}
        className="payment-container"
      >
        <h3>Payment Information</h3>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm handleplaceOrder={handleplaceOrder}></CheckoutForm>
          </Elements>
        </div>
        {orderId && (
          <div>
            {' '}
            <h3>Than You For Shipping With us</h3>
            <p> Your Order Id is: {orderId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipment;
