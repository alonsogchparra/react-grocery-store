import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faShop,
  faArrowLeft,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addProductsWithCount } from '../features/product/productSlice';
import { changeTheme } from '../features/theme/themeSlice';

export const Navbar = () => {
  const cartQuatinty = useSelector((state) => state.products.cartQuantity);
  const productsOnCart = useSelector((state) => state.products.prodsOnCart);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const themes = useSelector((state) => state.theme.themes);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const updateTheme = () => {
    const theme = themes[currentTheme];

    Object.keys(theme).forEach((key) => {
      const cssKey = `--${key}`;
      const cssValue = theme[key];

      document.body.style.setProperty(cssKey, cssValue);
    });

    dispatch(changeTheme(isDarkTheme));
  };

  const countProducts = () => {
    const counts = productsOnCart.reduce(
      (prev, curr) =>
        prev.some((item) => item.id === curr.id)
          ? prev
          : prev.concat({
              ...curr,
              count: productsOnCart.filter((item) => item.id === curr.id)
                .length,
              subTotal:
                curr.price *
                productsOnCart.filter((item) => item.id === curr.id).length,
            }),
      []
    );

    dispatch(addProductsWithCount(counts));
  };

  const navbarBtn =
    location?.pathname === '/cart' ? (
      <Link to={'/'}>
        <button>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size='xl'
            className='navbar_arrow_left'
          />
          <FontAwesomeIcon icon={faShop} size='xl' />
        </button>
      </Link>
    ) : (
      <Link to={'/cart'}>
        <button onClick={() => countProducts()}>
          <FontAwesomeIcon icon={faCartShopping} size='xl' />
          <span>{cartQuatinty}</span>
        </button>
      </Link>
    );

  const changeThemeBtn = isDarkTheme ? (
    <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
      <FontAwesomeIcon icon={faSun} size='xl' />
    </button>
  ) : (
    <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
      <FontAwesomeIcon icon={faMoon} size='xl' />
    </button>
  );

  useEffect(() => {
    updateTheme();
  }, [isDarkTheme]);

  return (
    <div className='navbar_container'>
      <div className='navbar_title'>
        <h1>Tienda de Viveres</h1>
      </div>
      <div className='navbar_icons_box'>
        <div className='navbar_cart_icon'>{changeThemeBtn}</div>
        <div className='navbar_cart_icon'>{navbarBtn}</div>
      </div>
    </div>
  );
};
