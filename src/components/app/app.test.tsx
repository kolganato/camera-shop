import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { makeFakeProduct, makeFakeStore } from '../../test-mocks/test-mocks';
import { AppRoute, TIME_TO_RENDER_PAGE, TitlesPages } from '../../config';
import { render, screen } from '@testing-library/react';
import { testInitialState } from '../../store/products/products-slice';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Должен отрисовать MainPage', () => {
    const testId = 'main';
    const expectedText = TitlesPages.Catalog;

    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Root);

    render(withHistoryComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Должен отрисовать Page404', () => {
    const notFoundTestId = 'page-404';
    const expectedText = TitlesPages.NotFound;

    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withHistoryComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(notFoundTestId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Должен отрисовать BasketPage', () => {
    const basketTestId = 'basket';
    const expectedText = TitlesPages.Basket;

    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withHistoryComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(basketTestId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Должен отрисовать ProductPage', () => {
    const productPageTestId = 'product-page';

    const mockProduct = makeFakeProduct();
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        PRODUCTS: {
          ...testInitialState,
          products: [mockProduct],
        },
      })
    );

    const expectedText = mockProduct.name;

    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`${AppRoute.Catalog}/${mockProduct.id}`);

    render(withHistoryComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(productPageTestId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
