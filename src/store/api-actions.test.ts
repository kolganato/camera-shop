import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '.';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeProduct,
  makeFakeReview,
  makeFakeReviewNew,
} from '../test-mocks/test-mocks';
import { APIRoute } from '../config';
import {
  fetchReviewAction,
  getProductsAction,
  getPromoAction,
  getReviewsAction,
  getSimilarProductsAction,
} from './api-actions';
import faker from 'faker';

describe('Асинхронные запросы', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PRODUCTS: { products: [] } });
  });

  describe('getProductsAction', () => {
    it('Должен вернуть массив продуктов при коде ответа сервера 200', async () => {
      const mockProducts = [makeFakeProduct()];
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockProducts);

      await store.dispatch(getProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getProductsActionFullfiled = emittedActions.at(1) as ReturnType<
        typeof getProductsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        getProductsAction.pending.type,
        getProductsAction.fulfilled.type,
      ]);

      expect(getProductsActionFullfiled.payload).toEqual(mockProducts);
    });

    it('Должен вернуть getProductsAction.pending & getProductsAction.rejected при коде 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(getProductsAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getProductsAction.pending.type,
        getProductsAction.rejected.type,
      ]);
    });
  });

  describe('getPromoAction', () => {
    it('Должен вернуть массив промо продуктов при коде ответа сервера 200', async () => {
      const mockPromoProducts = [makeFakeProduct()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoProducts);

      await store.dispatch(getPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getPromoActionFullfiled = emittedActions.at(1) as ReturnType<
        typeof getPromoAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        getPromoAction.pending.type,
        getPromoAction.fulfilled.type,
      ]);

      expect(getPromoActionFullfiled.payload).toEqual(mockPromoProducts);
    });

    it('Должен вернуть getPromoAction.pending & getPromoAction.rejected при коде 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(getPromoAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromoAction.pending.type,
        getPromoAction.rejected.type,
      ]);
    });
  });

  describe('getSimilarProductsAction', () => {
    it('Должен вернуть массив похожих продуктов при коде ответа сервера 200', async () => {
      const mockSimilarProducts = [makeFakeProduct()];
      const mockProduct = makeFakeProduct();
      mockAxiosAdapter
        .onGet(
          `${APIRoute.Products}/${mockProduct.id}${APIRoute.SimilarProducts}`
        )
        .reply(200, mockSimilarProducts);

      await store.dispatch(getSimilarProductsAction(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getSimilarProductsActionFullfiled = emittedActions.at(
        1
      ) as ReturnType<typeof getSimilarProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getSimilarProductsAction.pending.type,
        getSimilarProductsAction.fulfilled.type,
      ]);

      expect(getSimilarProductsActionFullfiled.payload).toEqual(
        mockSimilarProducts
      );
    });

    it('Должен вернуть getSimilarProductsAction.pending & getSimilarProductsAction.rejected при коде 404', async () => {
      const mockProduct = makeFakeProduct();
      mockAxiosAdapter
        .onGet(
          `${APIRoute.Products}/${mockProduct.id}${APIRoute.SimilarProducts}`
        )
        .reply(404, []);

      await store.dispatch(getSimilarProductsAction(mockProduct.id));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarProductsAction.pending.type,
        getSimilarProductsAction.rejected.type,
      ]);
    });
  });

  describe('getReviewsAction', () => {
    it('Должен вернуть массив отзывов при коде ответа сервера 200', async () => {
      const mockReviews = [makeFakeReview()];
      const mockProduct = makeFakeProduct();
      mockAxiosAdapter
        .onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      await store.dispatch(getReviewsAction(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getReviewsActionFullfiled = emittedActions.at(1) as ReturnType<
        typeof getReviewsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.fulfilled.type,
      ]);

      expect(getReviewsActionFullfiled.payload).toEqual(mockReviews);
    });
  });

  describe('fetchReviewAction', () => {
    it('Должен вернуть массив похожих продуктов при коде ответа сервера 200', async () => {
      const mockReviewNew = makeFakeReviewNew();
      const mockReview = {
        ...mockReviewNew,
        id: faker.random.alpha({ count: 4 }),
        createAt: String(new Date()),
      };
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, mockReview);

      await store.dispatch(fetchReviewAction(mockReviewNew));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewActionFullfiled = emittedActions.at(1) as ReturnType<
        typeof fetchReviewAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviewAction.pending.type,
        fetchReviewAction.fulfilled.type,
      ]);

      expect(fetchReviewActionFullfiled.payload).toEqual(mockReview);
    });

    it('Должен вернуть fetchReviewAction.pending & fetchReviewAction.rejected при коде 400', async () => {
      const mockReviewNew = makeFakeReviewNew();
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(400, []);

      await store.dispatch(fetchReviewAction(mockReviewNew));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewAction.pending.type,
        fetchReviewAction.rejected.type,
      ]);
    });
  });
});
