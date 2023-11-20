import { MutableRefObject } from 'react';
import {
  ProductCategory,
  ProductLevel,
  ProductType,
  SortingDirection,
  SortingType,
  Tab,
} from '../config';
import { Filter } from '../types/fitler';
import { Product } from '../types/product';
import { ReviewData } from '../types/review-data';

const sortLowToHigh = (a: Product, b: Product) => a.price - b.price;

const sortHighToLow = (a: Product, b: Product) => b.price - a.price;

const sortByRatingUpToDown = (a: Product, b: Product) => b.rating - a.rating;

const sortByRatingDownToUp = (a: Product, b: Product) => a.rating - b.rating;

export const sortReviewsByDate = (a: ReviewData, b: ReviewData) =>
  Date.parse(b.createAt) - Date.parse(a.createAt);

type Sorting = (
  products: Product[],
  priority: SortingDirection | null,
  method: SortingType | null
) => Product[];

export const sorting: Sorting = (products, priority, method) => {
  if (method === SortingType.Price) {
    switch (priority) {
      case SortingDirection.LowToHigh:
        return products.slice().sort(sortLowToHigh);
      case SortingDirection.HighToLow:
        return products.slice().sort(sortHighToLow);
    }
  }

  if (method === SortingType.Popular) {
    switch (priority) {
      case SortingDirection.LowToHigh:
        return products.slice().sort(sortByRatingDownToUp);
      case SortingDirection.HighToLow:
        return products.slice().sort(sortByRatingUpToDown);
    }
  }

  return products.slice();
};

export const COUNT_PRODUCTS_SHOW = 9;

export const DEFAULT_PAGE_NUMBER = 1;

export const COUNT_PAGES_PAGIONATIONS_SHOW = 3;

export const getStartPagePagination = (
  currentPage: number,
  countPages: number,
  arrayPages: number[]
) =>
  currentPage + 2 <= countPages
    ? currentPage - DEFAULT_PAGE_NUMBER
    : arrayPages[arrayPages.length - 4];

export const getTab = <T = string | null | Tab>(tab: T) => {
  if (tab === Tab.Characteristics) {
    return Tab.Characteristics;
  }

  if (tab === Tab.Description) {
    return Tab.Description;
  }

  return Tab.Characteristics;
};

export const getCurrentSortingType = (param: string | null | SortingType): SortingType | null => {
  if (param === SortingType.Popular) {
    return SortingType.Popular;
  }

  if (param === SortingType.Price) {
    return SortingType.Price;
  }

  return null;
};

export const getCurrentSortingDirection = (
  param: string | null | SortingDirection
): SortingDirection | null => {
  if (param === SortingDirection.HighToLow) {
    return SortingDirection.HighToLow;
  }

  if (param === SortingDirection.LowToHigh) {
    return SortingDirection.LowToHigh;
  }

  return null;
};

export const getCurrentCategory = (
  param: string | null
): ProductCategory | null => {
  if (param === ProductCategory.Photo) {
    return ProductCategory.Photo;
  }

  if (param === ProductCategory.Video) {
    return ProductCategory.Video;
  }

  return null;
};

export const makeArrayByChecked = (
  elements: MutableRefObject<HTMLInputElement | null>[]
) => {
  const newArr: string[] = [];

  elements.forEach((element) => {
    if (element.current?.checked) {
      newArr.push(element.current.value);
    }
  });

  return newArr;
};

export const createFilterData = (params: URLSearchParams): Filter => {
  const data = {} as Filter;
  const priceMin = params.get('price_gte') ? params.get('price_gte') : null;
  const priceMax = params.get('price_lte') ? params.get('price_lte') : null;
  const types = params.get('types') ? params.get('types') : null;
  const levels = params.get('levels') ? params.get('levels') : null;
  const category = params.get('category') ? params.get('category') : null;

  if (priceMin) {
    data.priceMin = Number(priceMin);
  }

  if (priceMax) {
    data.priceMax = Number(priceMax);
  }

  if (category) {
    data.category = getCurrentCategory(category);
  }

  if (types) {
    const productTypes: string[] = Object.values(ProductType);

    data.type = types
      .split(',')
      .filter((item) => productTypes.includes(item)) as ProductType[];
  }

  if (levels) {
    const productCategories: string[] = Object.values(ProductLevel);

    data.level = levels
      .split(',')
      .filter((item) => productCategories.includes(item)) as ProductLevel[];
  }

  return data;
};

export const getFilteredProductsWithoutPrice = (products: Product[], filterData: Filter): Product[] =>
  products.filter((product) => {
    if (filterData?.category && filterData.category !== product.category) {
      return false;
    }

    if (filterData?.type && !filterData.type?.includes(product.type)) {
      return false;
    }

    if (filterData?.level && !filterData.level?.includes(product.level)) {
      return false;
    }

    return true;
  });

export const getFilteredProducts = (products: Product[], filterData: Filter): Product[] =>
  products.filter((product) => {
    if (filterData?.category && filterData.category !== product.category) {
      return false;
    }

    if (filterData?.type && !filterData.type?.includes(product.type)) {
      return false;
    }

    if (filterData?.level && !filterData.level?.includes(product.level)) {
      return false;
    }

    if(filterData?.priceMin && !(filterData.priceMin <= product.price)){
      return false;
    }

    if(filterData?.priceMax && !(filterData.priceMax >= product.price)){
      return false;
    }

    return true;
  });
