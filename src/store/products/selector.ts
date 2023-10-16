import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { State } from '..';
import { ProductsState } from './products-slice';
import { COUNT_PRODUCTS_SHOW, DEFAULT_PAGE_NUMBER } from '../../utils/common';

export const getProductsShow = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => {
    const currentPage = state.currentPage;
    const products = state.products;

    if (currentPage === DEFAULT_PAGE_NUMBER) {
      return products.slice(0, COUNT_PRODUCTS_SHOW);
    }

    return products.slice(
      (currentPage - 1) * COUNT_PRODUCTS_SHOW,
      COUNT_PRODUCTS_SHOW * currentPage
    );
  }
  // добавить .filter и проверку через state.filter
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
  (state: ProductsState) => state.reviews
);

export const getStatusReviewsLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isReviewsLoading
);
