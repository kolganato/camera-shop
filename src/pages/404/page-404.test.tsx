import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { TIME_TO_RENDER_PAGE, TitlesPages } from '../../config';
import Page404 from '.';
import { testInitialState } from '../../store/products/products-slice';

describe('Component: Page404', () => {
  it('Должен отрисовать компонент', () => {
    const notFoundTestId = 'page-404';
    const expectedText = TitlesPages.NotFound;

    const { withStoreComponent } = withStore(<Page404 />, {
      PRODUCTS: {
        ...testInitialState,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(notFoundTestId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
