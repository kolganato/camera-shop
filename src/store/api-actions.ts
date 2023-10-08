import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { CombinedType } from '../types/api-types';
import { APIRoute } from '../config';

export const getProductsAction = createAsyncThunk<
  Product[],
  undefined,
  CombinedType
>('quests/fetchQuests', async (_arg, { extra: api }) => {
  const { data } = await api.get<Product[]>(APIRoute.Products);
  return data;
});
