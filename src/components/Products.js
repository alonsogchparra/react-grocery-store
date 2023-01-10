import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCartQuantity,
  addProductsToCart,
  calculateTotal,
  startWithProducts,
} from '../features/product/productSlice';

export const Products = () => {
  const allProducts = useSelector((state) => state.products.prods);
  const dispatch = useDispatch();

  const newContentHandler = () => {
    const newCont = allProducts.map((cnt) => ({
      ...cnt,
      canAddCart: cnt.amount > 0,
    }));
    dispatch(startWithProducts(newCont));
  };

  const addCartHandler = (product) => {
    dispatch(addCartQuantity(product));
    dispatch(addProductsToCart(product));
    dispatch(calculateTotal());
  };

  useEffect(() => {
    newContentHandler();
  }, []);

  if (allProducts.length === 0) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <div className='products_container animate__animated animate__fadeIn'>
        {allProducts.map((product) => (
          <div className='products_item' key={product.id}>
            <div className='products_title_content'>
              <div className='products_title'>{product.name}</div>
            </div>

            <div className='products_details_content'>
              <div className='products_price'>
                <span>Precio:</span> {product.price}
              </div>
              <div className='products_amount'>
                <span>Monto:</span> {product.amount}
              </div>
              <button
                onClick={() => addCartHandler(product)}
                disabled={product.amount <= 0}
              >
                AGREGAR AL CARRO
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
