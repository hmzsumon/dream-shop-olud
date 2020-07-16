import React from 'react';
import logo from '../../images/images.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';

const Header = () => {
  const auth = useAuth();

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul className="nav-bar">
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/review">Order Review</a>
          </li>
          <li>
            <a href="/inventory">Manage Inventory</a>
          </li>
        </ul>
        <div className="user-area">
          <li>
            {auth.user && (
              <a href="/login">
                {' '}
                <i className="fa fa-user" aria-hidden="true"></i>{' '}
                {auth.user.name}
              </a>
            )}
            {auth.user ? (
              <a href="/login">Sign Out</a>
            ) : (
              <a href="/login">Sign In</a>
            )}
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Header;
