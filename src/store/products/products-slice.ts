import { NameSpace } from '../../config';
import { Coupon } from '../../types/coupon';
import { Filter } from '../../types/fitler';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { ReviewData } from '../../types/review-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsAction, getPromoAction } from '../api-actions';

export type ProductsState = {
  products: Product[];
  productsSilimar: Product[];
  promo: Promo[];
  reviews: ReviewData[];
  coupon: Coupon | null;
  basket: number[];
  filter: Filter;
  hasError: boolean;
  isProductsLoading: boolean;
  isPromoLoading: boolean;
};

const initialState: ProductsState = {
  products: [],
  productsSilimar: [],
  promo: [],
  reviews: [],
  coupon: null,
  basket: [],
  filter: {
    type: null,
    category: null,
    level: null,
    priceMin: null,
    priceMax: null,
  },
  hasError: false,
  isProductsLoading: false,
  isPromoLoading: false,
};

const productSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filter = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(getProductsAction.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.isProductsLoading = true;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.isProductsLoading = false;
        state.hasError = true;
      })
      .addCase(getPromoAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(getPromoAction.fulfilled, (state, { payload }) => {
        state.promo = payload;
        state.isPromoLoading = true;
      })
      .addCase(getPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
        state.hasError = true;
      });
  },
});

export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
