import { ProductCategory, ProductLevel, ProductType } from '../config';

export type Filter = {
  type: ProductType[];
  category: ProductCategory | null;
  level: ProductLevel[];
  priceMin: number | null;
  priceMax: number | null;
};

export type FilterForm = Filter;
