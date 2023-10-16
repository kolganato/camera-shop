import { NameSpace } from '../../config';
import { Coupon } from '../../types/coupon';
import { Filter } from '../../types/fitler';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { ReviewData } from '../../types/review-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsAction, getPromoAction, getReviews, getSimilarProductsAction } from '../api-actions';
import { DEFAULT_PAGE_NUMBER } from '../../utils/common';

export type ProductsState = {
  products: Product[];
  currentPage: number;
  similarProducts: Product[];
  productToAdd: Product | null;
  isActiveModal: boolean;
  promo: Promo[];
  reviews: ReviewData[];
  coupon: Coupon | null;
  basket: number[];
  filter: Filter;
  hasError: boolean;
  isProductsLoading: boolean;
  isPromoLoading: boolean;
  isSimilarProductsLoading: boolean;
  isReviewsLoading: boolean;
};

const initialState: ProductsState = {
  products: [],
  currentPage: DEFAULT_PAGE_NUMBER,
  similarProducts: [],
  productToAdd: null,
  isActiveModal: false,
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
  isSimilarProductsLoading: false,
  isReviewsLoading: false,
};

const productSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filter = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    addProductToBasket: (state, { payload }: PayloadAction<Product['id']>) => {
      state.basket = [...state.basket, payload];
    },
    setProductToAdd: (state, { payload }: PayloadAction<Product | null>) => {
      state.productToAdd = payload;
      if (payload === null) {
        state.isActiveModal = false;
      } else {
        state.isActiveModal = true;
      }
    },
    setStatusSimilarProducts: (state, { payload }: PayloadAction<boolean>) => {
      state.isSimilarProductsLoading = payload;
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
      })
      .addCase(getSimilarProductsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(getSimilarProductsAction.fulfilled, (state, { payload }) => {
        state.similarProducts = payload;
        state.isSimilarProductsLoading = true;
      })
      .addCase(getSimilarProductsAction.rejected, (state) => {
        state.isSimilarProductsLoading = false;
        state.hasError = true;
      })
      .addCase(getReviews.pending, (state) => {
        state.hasError = false;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.isReviewsLoading = true;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isReviewsLoading = false;
        state.hasError = true;
      });
  },
});

export const {
  setFilter,
  setCurrentPage,
  setProductToAdd,
  addProductToBasket,
  setStatusSimilarProducts
} = productSlice.actions;

export default productSlice.reducer;
