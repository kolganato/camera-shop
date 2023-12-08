import { NameSpace } from '../../config';
import {
  makeFakeProduct,
  makeFakePromo,
  makeFakeReview,
} from '../../test-mocks/test-mocks';
import {
  COUNT_PRODUCTS_SHOW,
  DEFAULT_PAGE_NUMBER,
  getFilteredProducts,
  sorting,
} from '../../utils/common';
import { testInitialState } from './products-slice';
import {
  getArrayCountPagesByProducts,
  getBasket,
  getCountPagesByProducts,
  getCountProducts,
  getCountProductsInBasket,
  getCoupon,
  getCurrentPage,
  getHasError,
  getIsModalOrderSuccess,
  getIsModalProduct,
  getIsModalProductSucess,
  getIsModalRemoveProduct,
  getIsModalReview,
  getIsModalReviewSuccess,
  getIsProductsLoading,
  getIsPromoLoading,
  getOrderData,
  getProductToAdd,
  getProductToRemove,
  getProducts,
  getProductsBySearchLive,
  getProductsShow,
  getPromoProducts,
  getReviews,
  getSearchLive,
  getSimilarProducts,
  getStatusBasket,
  getStatusOrder,
  getStatusPromocodeData,
  getStatusReviewData,
  getStatusReviewsLoading,
  getStatusShowModal,
  getStatusSimilarProductsLoading,
  getTotalPrice,
} from './selector';

describe('Products selectors', () => {
  const state = {
    [NameSpace.Products]: {
      ...testInitialState,
      products: Array.from({ length: 39 }, makeFakeProduct),
      reviews: Array.from({ length: 83 }, makeFakeReview),
      similarProducts: Array.from({ length: 12 }, makeFakeProduct),
      promo: Array.from({ length: 3 }, makeFakePromo),
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

  it('Должен получить false при попытке подключиться к серверу', () => {
    const { hasError } = state[NameSpace.Products];
    const result = getHasError(state);
    expect(result).toBe(hasError);
  });

  it('Должен получить список товаров для отображения в каталоге на одной странице', () => {
    const { products, currentPage, filter, sortingType, sortingDirection } =
      state[NameSpace.Products];
    const result = getProductsShow(state);

    const filteredProducts = getFilteredProducts(products, filter);

    if (currentPage === DEFAULT_PAGE_NUMBER) {
      expect(result).toEqual(
        sorting(filteredProducts, sortingDirection, sortingType).slice(
          0,
          COUNT_PRODUCTS_SHOW
        )
      );
    } else {
      expect(result).toEqual(
        sorting(filteredProducts, sortingDirection, sortingType).slice(
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
    const { products, filter } = state[NameSpace.Products];
    const result = getCountPagesByProducts(state);
    const filteredProducts = getFilteredProducts(products, filter);

    const countProducts = filteredProducts.length;

    if (countProducts < 9) {
      expect(result).toBe(1);
    } else {
      const countPages = Math.ceil(countProducts / 9);
      expect(result).toBe(countPages);
    }
  });

  it('Должен получить массив страниц пагинации', () => {
    const { products, filter } = state[NameSpace.Products];
    const result = getArrayCountPagesByProducts(state);
    const filteredProducts = getFilteredProducts(products, filter);

    const countProducts = filteredProducts.length;
    const countPages = Math.ceil(countProducts / 9);

    if(countProducts < 9){
      expect(result).toEqual([]);
    }else{
      expect(result).toEqual(Array.from({ length: countPages }, (_, index) => index + 1));
    }
  });

  it('Должен получить текущую страницу пагинации', () => {
    const { currentPage } = state[NameSpace.Products];
    const result = getCurrentPage(state);
    expect(result).toBe(currentPage);
  });

  it('Должен получить статус заполнености корзины', () => {
    const { basket } = state[NameSpace.Products];
    const result = getStatusBasket(state);
    expect(result).toEqual(basket.length === 0);
  });

  it('Должен получить массив id из корзины', () => {
    const { basket } = state[NameSpace.Products];
    const result = getBasket(state);
    expect(result).toEqual(basket);
  });

  it('Должен получить товар для добавления в корзины', () => {
    const { productToAdd } = state[NameSpace.Products];
    const result = getProductToAdd(state);
    expect(result).toEqual(productToAdd);
  });

  it('Должен получить товар для удаления из корзины', () => {
    const { productToRemove } = state[NameSpace.Products];
    const result = getProductToRemove(state);
    expect(result).toEqual(productToRemove);
  });

  it('Должен получить количество товаров в корзине', () => {
    const { basket } = state[NameSpace.Products];
    const result = getCountProductsInBasket(state);

    const data: number[] = [];

    basket.forEach((item) => {
      data.push(...Array.from({length: item.count}, () => item.id));
    });

    expect(result).toBe(data.length);
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

  it('Должен получить статус модального окна успешного добавления продуктов в корзину', () => {
    const { isModalProductSuccess } = state[NameSpace.Products];
    const result = getIsModalProductSucess(state);
    expect(result).toBe(isModalProductSuccess);
  });

  it('Должен получить статус модального окна успешного отправления отзыва', () => {
    const { isModalReviewSuccess } = state[NameSpace.Products];
    const result = getIsModalReviewSuccess(state);
    expect(result).toBe(isModalReviewSuccess);
  });

  it('Должен получить статус модального окна удаления товара', () => {
    const { isModalRemoveProduct } = state[NameSpace.Products];
    const result = getIsModalRemoveProduct(state);
    expect(result).toBe(isModalRemoveProduct);
  });

  it('Должен получить статус модального окна успешного оформления заказа', () => {
    const { isModalOrderSuccess } = state[NameSpace.Products];
    const result = getIsModalOrderSuccess(state);
    expect(result).toBe(isModalOrderSuccess);
  });

  it('Должен получить статус отправления отзыва', () => {
    const { statusReviewData } = state[NameSpace.Products];
    const result = getStatusReviewData(state);
    expect(result).toEqual(statusReviewData);
  });

  it('Должен получить searchLive', () => {
    const { searchLive } = state[NameSpace.Products];
    const result = getSearchLive(state);
    expect(result).toEqual(searchLive);
  });

  it('Должен получить список продуктов для поиска', () => {
    const { products, searchLive } = state[NameSpace.Products];
    const result = getProductsBySearchLive(state);
    const searchLiveReg = new RegExp(searchLive, 'ig');

    expect(result).toEqual(
      products.filter((product) => product.name.match(searchLiveReg))
    );
  });

  it('Должен получить полную стоимость товаров в корзине', () => {
    const { basket } = state[NameSpace.Products];
    const result = getTotalPrice(state);

    expect(result).toEqual(basket.reduce((total, product) => (product.price * product.count) + total, 0));
  });

  it('Должен получить статус проверки промокода', () => {
    const { statusPromocodeData } = state[NameSpace.Products];
    const result = getStatusPromocodeData(state);
    expect(result).toEqual(statusPromocodeData);
  });

  it('Должен получить купон', () => {
    const { coupon } = state[NameSpace.Products];
    const result = getCoupon(state);
    expect(result).toEqual(coupon);
  });

  it('Должен получить сформированные данные для оформления заказа', () => {
    const { basket } = state[NameSpace.Products];
    const result = getOrderData(state);
    const data: number[] = [];

    basket.forEach((item) => {
      data.push(...Array.from({length: item.count}, () => item.count));
    });

    expect(result).toEqual(data);
  });

  it('Должен получить статус оформления заказа', () => {
    const { statusOrderData } = state[NameSpace.Products];
    const result = getStatusOrder(state);
    expect(result).toEqual(statusOrderData);
  });
});
