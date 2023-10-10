import { SortMethod, SortPriority } from '../config';
import { Product } from '../types/product';

const sortLowToHigh = (a: Product, b: Product) => a.price - b.price;

const sortHighToLow = (a: Product, b: Product) => b.price - a.price;

const sortByRatingUpToDown = (a: Product, b: Product) => b.rating - a.rating;

const sortByRatingDownToUp = (a: Product, b: Product) => a.rating - b.rating;

type Sorting = (
  products: Product[],
  priority: SortPriority,
  method: SortMethod
) => Product[];

export const sorting: Sorting = (products, priority, method) => {
  switch ([priority, method]) {
    case [SortPriority.Up, SortMethod.Price]:
      return products.slice().sort(sortLowToHigh);
    case [SortPriority.Down, SortMethod.Price]:
      return products.slice().sort(sortHighToLow);
    case [SortPriority.Up, SortMethod.Popular]:
      return products.slice().sort(sortByRatingDownToUp);
    case [SortPriority.Down, SortMethod.Popular]:
      return products.slice().sort(sortByRatingUpToDown);
    default:
      return products.slice();
  }
};

export const COUNT_PRODUCTS_SHOW = 9;

export const DEFAULT_PAGE_NUMBER = 1;

export const COUNT_PAGES_PAGIONATIONS_SHOW = 3;

export const getStartPagePagination = (currentPage: number, countPages: number, arrayPages: number[]) => currentPage + 2 <= countPages ? currentPage - DEFAULT_PAGE_NUMBER : arrayPages[arrayPages.length - 4];
