import { ProductCategory, ProductLevel, ProductType } from '../config';

export type Filter = {
  type: ProductType | null;
  category: ProductCategory | null;
  level: ProductLevel | null;
  priceMin: number | null;
  priceMax: number | null;
};
