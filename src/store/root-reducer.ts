import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../config';
import productsSlice from './products/products-slice';

export const rootReducer = combineReducers({
  [NameSpace.Products]: productsSlice,
});
