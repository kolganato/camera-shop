import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { State } from '..';
import { ProductsState } from './products-slice';

export const getProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.products // добавить .filter и проверку через state.filter
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
