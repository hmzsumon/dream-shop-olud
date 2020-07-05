import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
  addToDatabaseCart,
  getDatabaseCart,
} from '../../utilities/databaseManager';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

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
    const newCart = [...cart, product];
    setCart(newCart);
    const sameProduct = newCart.filter((pd) => pd.key === product.key);
    const count = sameProduct.length;
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
