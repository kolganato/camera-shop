import { render, screen } from '@testing-library/react';
import Filter from '.';
import { withHistory, withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';

describe('Component: Filter', () => {
  it('Должен проверить правильность отрисовки', () => {
    const filterTestId = 'filter';

    const { withStoreComponent } = withStore(<Filter />, {
      PRODUCTS: {
        ...testInitialState,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(filterTestId)).toBeInTheDocument();
  });
});
