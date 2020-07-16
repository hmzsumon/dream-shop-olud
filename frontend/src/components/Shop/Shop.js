import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
  addToDatabaseCart,
  getDatabaseCart,
} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  //fetch data from db
  useEffect(() => {
    fetch('http://localhost:4200/products')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quentity = saveCart[existingKey];
      return product;
    });
    setCart(previousCart);
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        <ul>
          {products.map((product) => (
            <Product
              showAddToCart={true}
              key={product.key}
              handleAddProduct={handleAddProduct}
              product={product}
            ></Product>
          ))}
        </ul>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="button primary">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
