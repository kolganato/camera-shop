import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { State } from '..';
import { ProductsState } from './products-slice';

export const getProducts = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.products
);

export const getIsProductsLoading = createSelector(
  (state: Pick<State, NameSpace.Products>) => state[NameSpace.Products],
  (state: ProductsState) => state.isProductsLoading
);
