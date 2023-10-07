import {
  NameSpace,
} from '../../config';
import { Coupon } from '../../types/coupon';
import { Filter } from '../../types/fitler';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { ReviewData } from '../../types/review-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductsSlice = {
  products: Product[];
  productsSilimar: Product[];
  promo: Promo[];
  reviews: ReviewData[];
  coupon: Coupon | null;
  basket: number[];
  filter: Filter;
};

const initialState: ProductsSlice = {
  products: [],
  productsSilimar: [],
  promo: [],
  reviews: [],
  coupon: null,
  basket: [],
  filter: {
    type: null,
    category: null,
    level: null,
    priceMin: null,
    priceMax: null,
  },
};

const productSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filter = payload;
    },
  },
  // extraReducers(builder) {

  // },
});

export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
