import { NameSpace, SortingDirection, SortingType, Status } from '../../config';
import { Coupon } from '../../types/coupon';
import { Filter } from '../../types/fitler';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { ReviewData } from '../../types/review-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchReviewAction,
  getProductsAction,
  getPromoAction,
  getReviewsAction,
  getSimilarProductsAction,
} from '../api-actions';
import { DEFAULT_PAGE_NUMBER } from '../../utils/common';

export type ProductsState = {
  products: Product[];
  currentPage: number;
  similarProducts: Product[];
  productToAdd: Product | null;
  isActiveModal: boolean;
  isModalProduct: boolean;
  isModalReview: boolean;
  isModalProductSuccess: boolean;
  isModalReviewSuccess: boolean;
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
  statusReviewData: Status;
  searchLive: string;
  sortingType: SortingType;
  sortingDirection: SortingDirection;
};

const initialState: ProductsState = {
  products: [],
  currentPage: DEFAULT_PAGE_NUMBER,
  similarProducts: [],
  productToAdd: null,
  isActiveModal: false,
  isModalProduct: false,
  isModalReview: false,
  isModalProductSuccess: false,
  isModalReviewSuccess: false,
  promo: [],
  reviews: [],
  coupon: null,
  basket: [],
  filter: {
    type: [],
    category: null,
    level: [],
    priceMin: null,
    priceMax: null,
  },
  hasError: false,
  isProductsLoading: false,
  isPromoLoading: false,
  isSimilarProductsLoading: false,
  isReviewsLoading: false,
  statusReviewData: Status.Idle,
  searchLive: '',
  sortingType: SortingType.Default,
  sortingDirection: SortingDirection.Default,
};

export const productsSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setSortingType: (state, { payload }: PayloadAction<SortingType>) => {
      state.sortingType = payload;
    },
    setSortingDirection: (
      state,
      { payload }: PayloadAction<SortingDirection>
    ) => {
      state.sortingDirection = payload;
    },
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
    setStatusActiveModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isActiveModal = payload;
    },
    setStatusModalProduct: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalProduct = payload;
    },
    setStatusModalReview: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalReview = payload;
    },
    setStatusModalProductSuccess: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isModalProductSuccess = payload;
    },
    setStatusModalReviewSuccess: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isModalReviewSuccess = payload;
    },
    setStatusReviewData: (state, { payload }: PayloadAction<Status>) => {
      state.statusReviewData = payload;
    },
    setSearchLive: (state, { payload }: PayloadAction<string>) => {
      state.searchLive = payload;
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
      .addCase(getReviewsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(getReviewsAction.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.isReviewsLoading = true;
      })
      .addCase(getReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
        state.hasError = true;
      })
      .addCase(fetchReviewAction.pending, (state) => {
        state.statusReviewData = Status.Loading;
      })
      .addCase(fetchReviewAction.fulfilled, (state, { payload }) => {
        state.reviews = [...state.reviews, payload];
        state.statusReviewData = Status.Success;
      })
      .addCase(fetchReviewAction.rejected, (state) => {
        state.statusReviewData = Status.Error;
      });
  },
});

export const {
  setFilter,
  setCurrentPage,
  setProductToAdd,
  addProductToBasket,
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalReview,
  setStatusReviewData,
  setStatusModalProductSuccess,
  setStatusModalReviewSuccess,
  setSearchLive,
  setSortingType,
  setSortingDirection,
} = productsSlice.actions;

export { initialState as testInitialState };
