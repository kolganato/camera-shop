import { NameSpace, SortingDirection, SortingType, Status } from '../../config';
import { Filter } from '../../types/fitler';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { ReviewData } from '../../types/review-data';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchOrderAction,
  fetchPromocodeAction,
  fetchReviewAction,
  getProductsAction,
  getPromoAction,
  getReviewsAction,
  getSimilarProductsAction,
} from '../api-actions';
import { DEFAULT_PAGE_NUMBER } from '../../utils/common';
import { toast } from 'react-toastify';
import { ProductBasket } from '../../types/product-basket';
import { Coupon } from '../../types/api-types';

export type ProductsState = {
  products: Product[];
  currentPage: number;
  similarProducts: Product[];
  productToAdd: Product | null;
  productToRemove: Product | null;
  isActiveModal: boolean;
  isModalProduct: boolean;
  isModalReview: boolean;
  isModalProductSuccess: boolean;
  isModalReviewSuccess: boolean;
  isModalRemoveProduct: boolean;
  isModalOrderSuccess: boolean;
  promo: Promo[];
  reviews: ReviewData[];
  coupon: Coupon | null;
  basket: ProductBasket[];
  filter: Filter;
  hasError: boolean;
  isProductsLoading: boolean;
  isPromoLoading: boolean;
  isSimilarProductsLoading: boolean;
  isReviewsLoading: boolean;
  statusReviewData: Status;
  statusPromocodeData: Status;
  statusOrderData: Status;
  searchLive: string;
  sortingType: SortingType | null;
  sortingDirection: SortingDirection | null;
};

const initialState: ProductsState = {
  products: [],
  currentPage: DEFAULT_PAGE_NUMBER,
  similarProducts: [],
  productToAdd: null,
  productToRemove: null,
  isActiveModal: false,
  isModalProduct: false,
  isModalReview: false,
  isModalProductSuccess: false,
  isModalReviewSuccess: false,
  isModalRemoveProduct: false,
  isModalOrderSuccess: false,
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
  statusPromocodeData: Status.Idle,
  statusOrderData: Status.Idle,
  searchLive: '',
  sortingType: null,
  sortingDirection: null,
};

export const productsSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setSortingType: (state, { payload }: PayloadAction<SortingType | null>) => {
      state.sortingType = payload;
    },
    setSortingDirection: (
      state,
      { payload }: PayloadAction<SortingDirection | null>
    ) => {
      state.sortingDirection = payload;
    },
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filter = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    fillBasket: (state, { payload }: PayloadAction<ProductBasket[]>) => {
      state.basket = payload;
    },
    clearBasket: (state) => {
      state.basket = [];
      localStorage.removeItem('basket');
    },
    changeCountProductInBasket: (state, { payload }: PayloadAction<[Product['id'], number]>) => {
      const indexProductByBasket = state.basket.findIndex((item) => item.id === payload[0]);
      const productByBasket = current(state.basket.find((item) => item.id === payload[0]));

      if(productByBasket){
        const productsBasket = [...state.basket];

        productsBasket.splice(indexProductByBasket, 1, {...productByBasket, count: payload[1]});
        state.basket = [...productsBasket];
        localStorage.setItem('basket', JSON.stringify([...productsBasket]));
      }
    },
    increaseProductInBasket: (state, { payload }: PayloadAction<Product['id']>) => {
      const indexProductByBasket = state.basket.findIndex((item) => item.id === payload);
      const productByBasket = current(state.basket.find((item) => item.id === payload));

      if(productByBasket){
        const productsBasket = [...state.basket];

        productsBasket.splice(indexProductByBasket, 1, {...productByBasket, count: productByBasket.count + 1});
        state.basket = [...productsBasket];
        localStorage.setItem('basket', JSON.stringify([...productsBasket]));
      }
    },
    decreaseProductInBasket: (state, { payload }: PayloadAction<Product['id']>) => {
      const indexProductByBasket = state.basket.findIndex((item) => item.id === payload);
      const productByBasket = current(state.basket.find((item) => item.id === payload));

      if(productByBasket){
        const productsBasket = [...state.basket];

        productsBasket.splice(indexProductByBasket, 1, {...productByBasket, count: productByBasket.count - 1});
        state.basket = [...productsBasket];
        localStorage.setItem('basket', JSON.stringify([...productsBasket]));
      }
    },
    addProductToBasket: (state, { payload }: PayloadAction<Product['id']>) => {
      const indexProductByBasket = state.basket.findIndex((item) => item.id === payload);
      const productByBasket = state.basket.find((item) => item.id === payload);

      if(productByBasket){
        const productsBasket = [...state.basket];

        productsBasket.splice(indexProductByBasket, 1, {...productByBasket, count: productByBasket.count + 1});
        state.basket = [...productsBasket];
      }

      const product = state.products.find((item) => item.id === payload);

      if(!productByBasket && product){
        const data = [...state.basket, {...product, count: 1}];
        state.basket = data;
        localStorage.setItem('basket', JSON.stringify(data));
      }
    },
    removeProductFromBasket: (state, { payload }: PayloadAction<Product['id']>) => {
      const data = [...state.basket.filter((item) => item.id !== payload)];
      state.basket = data;
      localStorage.setItem('basket', JSON.stringify(data));
    },
    setProductToAdd: (state, { payload }: PayloadAction<Product | null>) => {
      state.productToAdd = payload;
      if (payload === null) {
        state.isActiveModal = false;
      } else {
        state.isActiveModal = true;
      }
    },
    setProductToRemove: (state, { payload }: PayloadAction<Product | null>) => {
      state.productToRemove = payload;
      if (payload === null) {
        state.isActiveModal = false;
      } else {
        state.isActiveModal = true;
      }
    },
    setStatusActiveModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isActiveModal = payload;
    },
    setStatusModalOrder: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalOrderSuccess = payload;
    },
    setStatusModalProduct: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalProduct = payload;
    },
    setStatusModalReview: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalReview = payload;
    },
    setStatusModalRemoveProduct: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalRemoveProduct = payload;
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
    setStatusPromocodeData: (state, { payload }: PayloadAction<Status>) => {
      state.statusPromocodeData = payload;
    },
    setStatusOrderData: (state, { payload }: PayloadAction<Status>) => {
      state.statusOrderData = payload;
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

        toast.error('Проблема с получением списка товаров');
      })
      .addCase(getPromoAction.pending, (state) => {
        state.isPromoLoading = false;
      })
      .addCase(getPromoAction.fulfilled, (state, { payload }) => {
        state.promo = payload;
        state.isPromoLoading = true;
      })
      .addCase(getPromoAction.rejected, (state) => {
        state.isPromoLoading = false;

        toast.error('Проблема с получением промо товаров');

      })
      .addCase(getSimilarProductsAction.pending, (state) => {
        state.isSimilarProductsLoading = false;
      })
      .addCase(getSimilarProductsAction.fulfilled, (state, { payload }) => {
        state.similarProducts = payload;
        state.isSimilarProductsLoading = true;
      })
      .addCase(getSimilarProductsAction.rejected, (state) => {
        state.isSimilarProductsLoading = false;

        toast.error('Проблема с получением списка похожих товаров');
      })
      .addCase(getReviewsAction.pending, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(getReviewsAction.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.isReviewsLoading = true;
      })
      .addCase(getReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;

        toast.error('Проблема с получением списка отзывов к товару');
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

        toast.error('Не удалось добавить отзыв');
      })
      .addCase(fetchPromocodeAction.pending, (state) => {
        state.statusPromocodeData = Status.Loading;
      })
      .addCase(fetchPromocodeAction.fulfilled, (state, { payload }) => {
        state.coupon = payload;
        state.statusPromocodeData = Status.Success;
      })
      .addCase(fetchPromocodeAction.rejected, (state) => {
        state.statusPromocodeData = Status.Error;
        state.coupon = null;

        toast.error('Промокод неверный');
      })
      .addCase(fetchOrderAction.pending, (state) => {
        state.statusOrderData = Status.Loading;
      })
      .addCase(fetchOrderAction.fulfilled, (state) => {
        state.statusOrderData = Status.Success;
      })
      .addCase(fetchOrderAction.rejected, (state) => {
        state.statusOrderData = Status.Error;

        toast.error('Не удалось сделать заказ');
      });
  },
});

export const {
  setFilter,
  setCurrentPage,
  setProductToAdd,
  setProductToRemove,
  addProductToBasket,
  removeProductFromBasket,
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalReview,
  setStatusReviewData,
  setStatusPromocodeData,
  setStatusOrderData,
  setStatusModalProductSuccess,
  setStatusModalReviewSuccess,
  setStatusModalRemoveProduct,
  setStatusModalOrder,
  setSearchLive,
  setSortingType,
  setSortingDirection,
  increaseProductInBasket,
  decreaseProductInBasket,
  changeCountProductInBasket,
  fillBasket,
  clearBasket
} = productsSlice.actions;

export { initialState as testInitialState };
