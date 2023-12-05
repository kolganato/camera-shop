import { Product } from './product';

export type ProductBasket = Product & {
  count: number;
};
