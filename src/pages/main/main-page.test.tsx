import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { TIME_TO_RENDER_PAGE, TitlesPages } from '../../config';
import { testInitialState } from '../../store/products/products-slice';
import MainPage from '.';

describe('Component: MainPage', () => {
  it('Должен отрисовать компонент', () => {
    const testId = 'main';
    const expectedText = TitlesPages.Catalog;

    const { withStoreComponent } = withStore(<MainPage />, {
      PRODUCTS: {
        ...testInitialState,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
