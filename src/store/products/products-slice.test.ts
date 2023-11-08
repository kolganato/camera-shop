import faker from 'faker';
import { Status } from '../../config';
import {
  makeFakeProduct,
  makeFakePromo,
  makeFakeReview,
  makeFakeReviewNew,
} from '../../test-mocks/test-mocks';
import { Filter } from '../../types/fitler';
import { DEFAULT_PAGE_NUMBER } from '../../utils/common';
import {
  fetchReviewAction,
  getProductsAction,
  getPromoAction,
  getReviewsAction,
  getSimilarProductsAction,
} from '../api-actions';
import {
  addProductToBasket,
  productsSlice,
  setCurrentPage,
  setFilter,
  setProductToAdd,
  setSearchLive,
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalProductSuccess,
  setStatusModalReview,
  setStatusModalReviewSuccess,
  setStatusReviewData,
  testInitialState,
} from './products-slice';

describe('Products Slice', () => {
  const state = {
    ...testInitialState,
    products: Array.from({ length: 39 }, makeFakeProduct),
    reviews: Array.from({ length: 83 }, makeFakeReview),
    similarProducts: Array.from({ length: 12 }, makeFakeProduct),
    promo: Array.from({ length: 3 }, makeFakePromo),
  };

  const initialState = {
    ...testInitialState,
  };

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...testInitialState };
    const result = productsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...testInitialState };
    const result = productsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть текущую страницу каталога', () => {
    const expectedCurrentPage = DEFAULT_PAGE_NUMBER;
    const result = productsSlice.reducer(
      state,
      setCurrentPage(expectedCurrentPage)
    );
    expect(result.currentPage).toBe(expectedCurrentPage);
  });

  it('Должен вернуть фильтры каталога', () => {
    const expectedFilter = {} as Filter;
    const result = productsSlice.reducer(state, setFilter(expectedFilter));
    expect(result.filter).toEqual(expectedFilter);
  });

  it('Должен вернуть массив с добавленным id продукта', () => {
    const product = makeFakeProduct();
    const expectedBasket = [product.id];
    const result = productsSlice.reducer(state, addProductToBasket(product.id));
    expect(result.basket).toEqual(expectedBasket);
  });

  it('Должен вернуть продукт для добавления в корзину и состояние модального окна добавления продукта', () => {
    const product = makeFakeProduct();
    const expectedState = {
      ...state,
      productToAdd: product,
      isActiveModal: true,
    };
    const result = productsSlice.reducer(state, setProductToAdd(product));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть состояния модального окна', () => {
    const expectedStatusActiveModal = true;
    const result = productsSlice.reducer(
      state,
      setStatusActiveModal(expectedStatusActiveModal)
    );
    expect(result.isActiveModal).toBe(expectedStatusActiveModal);
  });

  it('Должен вернуть состояния модального окна продукта', () => {
    const expectedStatusModalProduct = true;
    const result = productsSlice.reducer(
      state,
      setStatusModalProduct(expectedStatusModalProduct)
    );
    expect(result.isModalProduct).toBe(expectedStatusModalProduct);
  });

  it('Должен вернуть состояния модального окна отзыва', () => {
    const expectedStatusModalReview = true;
    const result = productsSlice.reducer(
      state,
      setStatusModalReview(expectedStatusModalReview)
    );
    expect(result.isModalReview).toBe(expectedStatusModalReview);
  });

  it('Должен вернуть состояния модального окна успешного отправления отзыва', () => {
    const expectedStatusModalProductSuccess = true;
    const result = productsSlice.reducer(
      state,
      setStatusModalReviewSuccess(expectedStatusModalProductSuccess)
    );
    expect(result.isModalReviewSuccess).toBe(expectedStatusModalProductSuccess);
  });

  it('Должен вернуть состояния модального окна успешного добавления продукта в корзину', () => {
    const expectedStatusModalReviewSuccess = true;
    const result = productsSlice.reducer(
      state,
      setStatusModalProductSuccess(expectedStatusModalReviewSuccess)
    );
    expect(result.isModalProductSuccess).toBe(expectedStatusModalReviewSuccess);
  });

  it('Должен вернуть значение searchLive', () => {
    const expectedSearchLive = 'look';
    const result = productsSlice.reducer(
      state,
      setSearchLive(expectedSearchLive)
    );
    expect(result.searchLive).toBe(expectedSearchLive);
  });

  it('Должен вернуть статус отправки отзыва', () => {
    const expectedStatusReviewData = Status.Idle;
    const result = productsSlice.reducer(
      state,
      setStatusReviewData(expectedStatusReviewData)
    );
    expect(result.statusReviewData).toBe(expectedStatusReviewData);
  });

  it('Должен вернуть флаг процесса загрузки true и ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      hasError: false,
    };

    const result = productsSlice.reducer(
      initialState,
      getProductsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки true и products', () => {
    const products = [makeFakeProduct()];
    const expectedState = {
      ...testInitialState,
      products,
      isProductsLoading: true,
    };

    const result = productsSlice.reducer(
      undefined,
      getProductsAction.fulfilled(products, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки продуктов false и ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isProductsLoading: false,
      hasError: true,
    };

    const result = productsSlice.reducer(undefined, getProductsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      hasError: false,
    };

    const result = productsSlice.reducer(initialState, getPromoAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки true и promo', () => {
    const promo = [makeFakePromo()];
    const expectedState = {
      ...testInitialState,
      promo,
      isPromoLoading: true,
    };

    const result = productsSlice.reducer(
      undefined,
      getPromoAction.fulfilled(promo, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки промо продуктов false и ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isPromoLoading: false,
      hasError: true,
    };

    const result = productsSlice.reducer(undefined, getPromoAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      hasError: false,
    };

    const result = productsSlice.reducer(
      initialState,
      getSimilarProductsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки true и похожие продукты', () => {
    const similarProducts = [makeFakeProduct()];
    const product = makeFakeProduct();
    const expectedState = {
      ...testInitialState,
      similarProducts,
      isSimilarProductsLoading: true,
    };

    const result = productsSlice.reducer(
      undefined,
      getSimilarProductsAction.fulfilled(similarProducts, '', product.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки похожих продуктов false и ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isSimilarProductsLoading: false,
      hasError: true,
    };

    const result = productsSlice.reducer(
      undefined,
      getSimilarProductsAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      hasError: false,
    };

    const result = productsSlice.reducer(
      initialState,
      getReviewsAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки true и отзывы', () => {
    const reviews = [makeFakeReview()];
    const product = makeFakeProduct();
    const expectedState = {
      ...testInitialState,
      reviews,
      isReviewsLoading: true,
    };

    const result = productsSlice.reducer(
      undefined,
      getReviewsAction.fulfilled(reviews, '', product.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки отзывов false и ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isReviewsLoading: false,
      hasError: true,
    };

    const result = productsSlice.reducer(undefined, getReviewsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус отправки отзыва Loading', () => {
    const expectedState = {
      ...testInitialState,
      statusReviewData: Status.Loading,
    };

    const result = productsSlice.reducer(
      initialState,
      fetchReviewAction.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус успешной отправки отзыва Success и добавить отзыв', () => {
    const reviewNew = makeFakeReviewNew();
    const review = {
      ...reviewNew,
      id: faker.random.alpha({ count: 4 }),
      createAt: String(new Date()),
    };
    const expectedState = {
      ...testInitialState,
      reviews: [review],
      statusReviewData: Status.Success,
    };

    const result = productsSlice.reducer(
      undefined,
      fetchReviewAction.fulfilled(review, '', reviewNew)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус отправки отзыва Error', () => {
    const expectedState = {
      ...testInitialState,
      statusReviewData: Status.Error
    };

    const result = productsSlice.reducer(undefined, fetchReviewAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
