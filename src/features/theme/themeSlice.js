import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: 'light',
    themes: {
      light: {
        main: '#234e70',
        navTitle: '#f4f4f4',
        navHover: ' #ffe716',
        prodBg: '#f4f4f4',
        prodBordeTop: '#234e70',
        prodButtonBg: '#234e70',
        prodBtnBgHv: '#faf8bf',
        carTitle: '#101920',
        cartProdBg: '#f4f4f4',
        cartDeleteBg: '#ff7474',
        cartDltBgHv: '#9e1a1a',
        cartNoTitle: '#101920',
        cartNoProd: '#101920',
        bg: '#faf8bf',
      },
      dark: {
        main: '#5bccf6',
        navTitle: '#101920',
        navHover: '#ffe716',
        prodBg: '#ffe716',
        prodBordeTop: '#101920',
        prodButtonBg: '#101920',
        prodBtnBgHv: '#5bccf6',
        carTitle: '#f4f4f4',
        cartProdBg: '#ffe716',
        cartDeleteBg: '#5bccf6',
        cartDltBgHv: '#147294',
        cartNoTitle: '#ffe716',
        cartNoProd: '#ffe716',
        bg: '#101920',
      },
    },
  },
  reducers: {
    changeTheme: (state, { payload }) => {
      if (!payload) {
        return {
          ...state,
          currentTheme: 'dark',
        };
      } else {
        return {
          ...state,
          currentTheme: 'light',
        };
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
