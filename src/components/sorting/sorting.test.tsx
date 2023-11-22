import { render, screen } from '@testing-library/react';
import Sorting from '.';
import { withHistory, withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';


describe('Component: Sorting', () => {
  it('Должен проверить правильность отрисовки', () => {
    const sortingTestId = 'sorting';

    const { withStoreComponent } = withStore(<Sorting />, {
      PRODUCTS: {
        ...testInitialState,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(sortingTestId)).toBeInTheDocument();
  });
});
