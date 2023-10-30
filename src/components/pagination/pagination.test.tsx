import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { testInitialState } from '../../store/products/products-slice';
import Pagination from '.';

describe('Component: Catalog', () => {
  it('Должен отрисовать компонент', () => {
    const products = Array.from({length: 39}, makeFakeProduct);
    const paginationTestId = 'pagination';
    const expectedText = 'Далее';

    const { withStoreComponent } = withStore(<Pagination />, {
      PRODUCTS: {
        ...testInitialState,
        products
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
