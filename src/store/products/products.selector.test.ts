import { NameSpace } from '../../config';
import {
  makeFakeProduct,
  makeFakePromo,
  makeFakeReview,
} from '../../test-mocks/test-mocks';
import { COUNT_PRODUCTS_SHOW, DEFAULT_PAGE_NUMBER } from '../../utils/common';
import { testInitialState } from './products-slice';
import {
  getArrayCountPagesByProducts,
  getBasket,
  getCountPagesByProducts,
  getCountProducts,
  getCountProductsInBasket,
  getCurrentPage,
  getIsModalProduct,
  getIsModalReview,
  getIsProductsLoading,
  getIsPromoLoading,
  getProductToAdd,
  getProducts,
  getProductsShow,
  getPromoProducts,
  getReviews,
  getSimilarProducts,
  getStatusReviewData,
  getStatusReviewsLoading,
  getStatusShowModal,
  getStatusSimilarProductsLoading,
} from './selector';

describe('Products selectors', () => {
  const state = {
    [NameSpace.Products]: {
      ...testInitialState,
      products: Array.from({ length: 39 }, makeFakeProduct),
      reviews: Array.from({length: 83}, makeFakeReview),
      similarProducts: Array.from({length: 12}, makeFakeProduct),
      promo: Array.from({length: 3}, makeFakePromo),
    },
  };

  it('Должен получить список товаров', () => {
    const { products } = state[NameSpace.Products];
    const result = getProducts(state);
    expect(result).toEqual(products);
  });

  it('Должен получить список отзывов', () => {
    const { reviews } = state[NameSpace.Products];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('Должен получить список похожих товаров', () => {
    const { similarProducts } = state[NameSpace.Products];
    const result = getSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });

  it('Должен получить список промо товаров', () => {
    const { promo } = state[NameSpace.Products];
    const result = getPromoProducts(state);
    expect(result).toEqual(promo);
  });

  it('Должен получить список товаров для отображения в каталоге на одной странице', () => {
    const { products, currentPage } = state[NameSpace.Products];
    const result = getProductsShow(state);

    if (currentPage === DEFAULT_PAGE_NUMBER) {
      expect(result).toEqual(products.slice(0, COUNT_PRODUCTS_SHOW));
    } else {
      expect(result).toEqual(
        products.slice(
          (currentPage - 1) * COUNT_PRODUCTS_SHOW,
          COUNT_PRODUCTS_SHOW * currentPage
        )
      );
    }
  });

  it('Должен получить количество товаров', () => {
    const { products } = state[NameSpace.Products];
    const result = getCountProducts(state);
    expect(result).toEqual(products.length);
  });

  it('Должен получить статус загрузки товаров', () => {
    const { isProductsLoading } = state[NameSpace.Products];
    const result = getIsProductsLoading(state);
    expect(result).toBe(isProductsLoading);
  });

  it('Должен получить статус загрузки промо товаров', () => {
    const { isPromoLoading } = state[NameSpace.Products];
    const result = getIsPromoLoading(state);
    expect(result).toBe(isPromoLoading);
  });

  it('Должен получить количество страниц пагинации относительно количества товаров', () => {
    const { products } = state[NameSpace.Products];
    const result = getCountPagesByProducts(state);
    const countProducts = products.length;
    const countPages = countProducts % 9;

    if (countProducts % 9 > 0) {
      expect(result).toBe(countPages + 1);
    } else {
      expect(result).toBe(countPages);
    }
  });

  it('Должен получить массив страниц пагинации', () => {
    const { products } = state[NameSpace.Products];
    const result = getArrayCountPagesByProducts(state);
    const countProducts = products.length;
    const countPages = countProducts % 9;

    if (countProducts % 9 > 0) {
      expect(result).toEqual(
        Array.from({ length: countPages + 1 }, (_, index) => index + 1)
      );
    } else {
      expect(result).toEqual(
        Array.from({ length: countPages }, (_, index) => index + 1)
      );
    }
  });

  it('Должен получить текущую страницу пагинации', () => {
    const { currentPage } = state[NameSpace.Products];
    const result = getCurrentPage(state);
    expect(result).toBe(currentPage);
  });

  it('Должен получить массив id из корзины', () => {
    const { basket } = state[NameSpace.Products];
    const result = getBasket(state);
    expect(result).toEqual(basket);
  });

  it('Должен получить товар для добавления в козину', () => {
    const { productToAdd } = state[NameSpace.Products];
    const result = getProductToAdd(state);
    expect(result).toEqual(productToAdd);
  });

  it('Должен получить количество товаров в корзине', () => {
    const { basket } = state[NameSpace.Products];
    const result = getCountProductsInBasket(state);
    expect(result).toBe(basket.length);
  });

  it('Должен получить статус отображения модального окна', () => {
    const { isActiveModal } = state[NameSpace.Products];
    const result = getStatusShowModal(state);
    expect(result).toBe(isActiveModal);
  });

  it('Должен получить статус загрузки похожих товаров', () => {
    const { isSimilarProductsLoading } = state[NameSpace.Products];
    const result = getStatusSimilarProductsLoading(state);
    expect(result).toBe(isSimilarProductsLoading);
  });

  it('Должен получить статус загрузки отзывов', () => {
    const { isReviewsLoading } = state[NameSpace.Products];
    const result = getStatusReviewsLoading(state);
    expect(result).toBe(isReviewsLoading);
  });

  it('Должен получить статус модального окна товара', () => {
    const { isModalProduct } = state[NameSpace.Products];
    const result = getIsModalProduct(state);
    expect(result).toBe(isModalProduct);
  });

  it('Должен получить статус модального окна отзыва', () => {
    const { isModalReview } = state[NameSpace.Products];
    const result = getIsModalReview(state);
    expect(result).toBe(isModalReview);
  });

  it('Должен получить статус отправления отзыва', () => {
    const { statusReviewData } = state[NameSpace.Products];
    const result = getStatusReviewData(state);
    expect(result).toEqual(statusReviewData);
  });
});
