import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { CombinedType } from '../types/api-types';
import { APIRoute } from '../config';
import { Promo } from '../types/promo';
import { ReviewData } from '../types/review-data';
import { Review } from '../types/review';

export const getProductsAction = createAsyncThunk<
  Product[],
  undefined,
  CombinedType
>('products/getProducts', async (_arg, { extra: api }) => {
  const { data } = await api.get<Product[]>(APIRoute.Products);
  return data;
});

export const getPromoAction = createAsyncThunk<
  Promo[],
  undefined,
  CombinedType
>('products/getPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<Promo[]>(APIRoute.Promo);
  return data;
});

export const getSimilarProductsAction = createAsyncThunk<
  Product[],
  Product['id'],
  CombinedType
>('products/getSimilarProducts', async (id, { extra: api }) => {
  const { data } = await api.get<Product[]>(`${APIRoute.Products}/${id}${APIRoute.SimilarProducts}`);
  return data;
});

export const getReviewsAction = createAsyncThunk<
  ReviewData[],
  Product['id'],
  CombinedType
>('products/getReviews', async (id, { extra: api }) => {
  const { data } = await api.get<ReviewData[]>(`${APIRoute.Products}/${id}${APIRoute.Reviews}`);
  return data;
});

export const fetchReviewAction = createAsyncThunk<
  ReviewData,
  Review,
  CombinedType
>('products/fetchReview', async (review, { extra: api }) => {
  const { data } = await api.post<ReviewData>(APIRoute.Reviews, review);

  return data;
});

