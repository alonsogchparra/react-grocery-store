import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faShop,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../features/product/productSlice';

export const Cart = () => {
  const prodsWithQuantity = useSelector(
    (state) => state.products.prodWithQuantity
  );
  const total = useSelector((state) => state.products.total);

  const dispatch = useDispatch();

  const deleteProductHandler = (product) => {
    dispatch(deleteProduct(product));
  };

  if (prodsWithQuantity?.length === 0) {
    return (
      <>
        <div className='cart_no_products'>
          <h1>NO HAY PRODUCTOS AGREGADOS EN EL CARRITO.</h1>
          <Link to={'/'}>
            <span className='cart_back_store'>
              <FontAwesomeIcon icon={faArrowLeft} size='3x' />
              <FontAwesomeIcon icon={faShop} size='3x' />
            </span>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='cart_container animate__animated animate__fadeIn'>
        <div className='cart_total'>
          <h1>Cart </h1>
          <h1>Total: {total}</h1>
        </div>
        {prodsWithQuantity.map((product) => (
          <div className='cart_product_content' key={product.id}>
            <div className='cart_info_product'>
              <h3>{product.name}</h3>
              <h5>Unit Price: {product.price}</h5>
              <h5>Quantity: {product.count}</h5>
              <h5>SubTotal: {product.subTotal}</h5>
            </div>
            <div
              className='cart_delete_content'
              onClick={() => deleteProductHandler(product)}
            >
              <FontAwesomeIcon icon={faTrash} size='xl' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
