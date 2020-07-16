import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  //submit handler
  const onSubmit = (data) => {
    console.log(data);
    //TODO: Move this aftr payment
    const sevedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: sevedCart,
      shipment: data,
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
        alert('Your Order Successfully Placed with order id:' + order._id);
        processOrder();
      });
  };

  return (
    <div className="shipment">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="shipment-form">
          <li>
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
            <input
              name="email"
              ref={register({ required: true })}
              placeholder="email:"
              defaultValue={auth.user.email}
            />
            {errors.email && (
              <span className="ship-error">Email is required</span>
            )}
          </li>

          <li>
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
            <input
              name="addressLine2"
              ref={register}
              placeholder="addresslin2:"
            />
          </li>

          <li>
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
            <input
              name="city"
              ref={register({ required: true })}
              placeholder="city:"
            />
            {errors.city && (
              <span className="ship-error">City is required</span>
            )}
          </li>

          <li>
            <input
              name="zippCode"
              ref={register({ required: true })}
              placeholder="zippCode:"
            />
            {errors.zippCode && (
              <span className="ship-error">Zipp Code is required</span>
            )}
          </li>

          <li>
            <input
              name="mobileNum"
              ref={register({ required: true })}
              placeholder="mobile number:"
            />
            {errors.mobileNum && (
              <span className="ship-error">Mobile Number is required</span>
            )}
          </li>

          <li className="submit">
            <button className="button primary" type="submit">
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Shipment;
