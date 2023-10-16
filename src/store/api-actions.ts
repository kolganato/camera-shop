import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { CombinedType } from '../types/api-types';
import { APIRoute } from '../config';
import { Promo } from '../types/promo';
import { ReviewData } from '../types/review-data';

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

export const getSimilarProductsAction = createAsyncThunk<
  Product[],
  Product['id'],
  CombinedType
>('quests/getSimilarProducts', async (id, { extra: api }) => {
  const { data } = await api.get<Product[]>(`${APIRoute.Products}/${id}${APIRoute.SimilarProducts}`);
  return data;
});

export const getReviews = createAsyncThunk<
  ReviewData[],
  Product['id'],
  CombinedType
>('quests/getReviews', async (id, { extra: api }) => {
  const { data } = await api.get<ReviewData[]>(`${APIRoute.Products}/${id}${APIRoute.Reviews}`);
  return data;
});

