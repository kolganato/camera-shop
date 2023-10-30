import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { TIME_TO_RENDER_PAGE, TitlesPages } from '../../config';
import { testInitialState } from '../../store/products/products-slice';
import BasketPage from '.';

describe('Component: BasketPage', () => {
  it('Должен отрисовать компонент', () => {
    const testId = 'basket';
    const expectedText = TitlesPages.Basket;

    const { withStoreComponent } = withStore(<BasketPage />, {
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
