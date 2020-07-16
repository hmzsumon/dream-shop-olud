import React from 'react';
import fakeData from '../../fakeData/';
function Inventory() {
  const hndleAddProduct = () => {
    const product = fakeData[0];
    console.log(product);
    fetch('http://localhost:4200/addProduct', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h2>This is Inventory</h2>
      <button onClick={hndleAddProduct}>Add Product</button>
    </div>
  );
}

export default Inventory;
