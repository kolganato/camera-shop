import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { CombinedType } from '../types/api-types';
import { APIRoute } from '../config';
import { Promo } from '../types/promo';

export const getProductsAction = createAsyncThunk<
  Product[],
  undefined,
  CombinedType
>('quests/getProducts', async (_arg, { extra: api }) => {
  const { data } = await api.get<Product[]>(APIRoute.Products);
  return data;
});

export const getPromoAction = createAsyncThunk<
  Promo[],
  undefined,
  CombinedType
>('quests/getPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<Promo[]>(APIRoute.Promo);
  return data;
});
