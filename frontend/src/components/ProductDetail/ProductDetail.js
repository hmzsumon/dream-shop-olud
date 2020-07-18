import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState(null);
  //get product
  useEffect(() => {
    fetch('https://sleepy-scrubland-24977.herokuapp.com/product/' + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productKey]);

  return (
    <div>
      {product && <Product showAddtoCart={false} product={product}></Product>}
    </div>
  );
};

export default ProductDetail;
