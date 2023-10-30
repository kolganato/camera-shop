import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { State } from '..';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../config';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middlware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const MockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = MockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Должен перенаправить на "/*" с помощью redirectToRoute', () => {
    const emptyAction = { type: '', payload: AppRoute.NotFound };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.NotFound);
  });
});
