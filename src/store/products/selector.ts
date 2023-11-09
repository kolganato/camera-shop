import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { State } from '..';
import { ProductsState } from './products-slice';
import {
  COUNT_PRODUCTS_SHOW,
  DEFAULT_PAGE_NUMBER,
  sortReviewsByDate,
  sorting,
} from '../../utils/common';

export const getProductsShow = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => {
    const products = state.products;
    const sortingType = state.sortingType;
    const sortingDirection = state.sortingDirection;
    const currentPage = state.currentPage;

    if (currentPage === DEFAULT_PAGE_NUMBER) {
      return sorting(products, sortingDirection, sortingType).slice(0, COUNT_PRODUCTS_SHOW);
    }

    return sorting(products, sortingDirection, sortingType).slice(
      (currentPage - 1) * COUNT_PRODUCTS_SHOW,
      COUNT_PRODUCTS_SHOW * currentPage
    );
  }
);

export const getProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.products
);

export const getCountProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.products.length
);

export const getIsProductsLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isProductsLoading
);

export const getIsPromoLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isPromoLoading
);

export const getPromoProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.promo
);

export const getCountPagesByProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => {
    const countProducts = state.products.length;
    const countPages = countProducts % 9;

    if (countProducts % 9 > 0) {
      return countPages + 1;
    }

    return countPages;
  }
);

export const getArrayCountPagesByProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => {
    const countProducts = state.products.length;
    const countPages = countProducts % 9;

    if (countProducts % 9 > 0) {
      return Array.from({ length: countPages + 1 }, (_, index) => index + 1);
    }

    return Array.from({ length: countPages }, (_, index) => index + 1);
  }
);

export const getCurrentPage = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.currentPage
);

export const getBasket = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.basket
);

export const getProductToAdd = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.productToAdd
);

export const getCountProductsInBasket = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.basket.length
);

export const getStatusShowModal = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isActiveModal
);

export const getSimilarProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.similarProducts
);

export const getStatusSimilarProductsLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isSimilarProductsLoading
);

export const getReviews = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.reviews.slice().sort(sortReviewsByDate)
);

export const getStatusReviewsLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isReviewsLoading
);

export const getIsModalProduct = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isModalProduct
);

export const getIsModalReview = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isModalReview
);

export const getIsModalProductSucess = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isModalProductSuccess
);

export const getIsModalReviewSuccess = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isModalReviewSuccess
);

export const getStatusReviewData = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.statusReviewData
);

export const getProductsBySearchLive = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => {
    const searchLiveReg = new RegExp(state.searchLive, 'ig');

    return state.products.filter((product) =>
      product.name.match(searchLiveReg)
    );
  }
);

export const getSearchLive = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.searchLive
);

