import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { testInitialState } from '../../store/products/products-slice';
import Pagination from '.';
import { TIME_TO_RENDER_PAGE } from '../../config';

describe('Component: Pagination', () => {
  it('Должен отрисовать компонент', () => {
    const products = Array.from({length: 39}, makeFakeProduct);
    const paginationTestId = 'pagination';
    const expectedText = 'Далее';

    const { withStoreComponent } = withStore(<Pagination />, {
      PRODUCTS: {
        ...testInitialState,
        products,
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();

      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
