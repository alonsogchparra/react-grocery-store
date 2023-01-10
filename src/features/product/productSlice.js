import { createSlice } from '@reduxjs/toolkit';
import { content } from '../utils/products';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    prods: content,
    cartQuantity: 0,
    tempProd: {},
    prodsOnCart: [],
    prodWithQuantity: [],
    total: 0,
    prodDeleted: {},
  },
  reducers: {
    startWithProducts: (state, action) => {
      return { ...state, prods: action.payload };
    },
    addCartQuantity: (state, action) => {
      return {
        ...state,
        cartQuantity: state.cartQuantity + 1,
        tempProd: action.payload,
        prods: state.prods.map((prod) => {
          if (prod.id === action.payload.id) {
            return {
              ...prod,
              amount: prod.amount <= 0 ? 0 : prod.amount - 1,
              canAddCart: prod.amount >= 1,
            };
          }
          return prod;
        }),
      };
    },
    checkProductList: (state, action) => {
      return {
        ...state,
        prods: state.prods.map((prod) => {
          if (prod.id === state.tempProd.id) {
            return {
              ...prod,
              amount: prod.amount <= 0 ? 0 : prod.amount - 1,
              canAddCart: prod.amount > 0,
            };
          }
          return prod;
        }),
      };
    },
    addProductsToCart: (state, action) => {
      return {
        ...state,
        prodsOnCart: [...state.prodsOnCart, action.payload],
      };
    },
    addProductsWithCount: (state, action) => {
      return {
        ...state,
        prodWithQuantity: action.payload,
      };
    },
    calculateTotal: (state, action) => {
      return {
        ...state,
        total: state.prodsOnCart.reduce((acc, obj) => {
          return acc + obj.price;
        }, 0),
      };
    },
    deleteProduct: (state, { payload }) => {
      return {
        ...state,
        prodWithQuantity: state.prodWithQuantity.filter(
          (pwq) => pwq.id !== payload.id
        ),
        cartQuantity: state.cartQuantity - payload.count,
        total: state.total - payload.subTotal,
        prods: state.prods.map((prod) => {
          if (prod.id === payload.id) {
            return {
              ...prod,
              amount: prod.amount + payload.count,
            };
          } else {
            return prod;
          }
        }),
        prodsOnCart: state.prodsOnCart.filter((poc) => poc.id !== payload.id),
      };
    },
  },
});

export const {
  startWithProducts,
  addCartQuantity,
  checkProductList,
  addProductsToCart,
  addProductsWithCount,
  calculateTotal,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
