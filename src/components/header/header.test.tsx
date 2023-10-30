import Header from '.';
import { render, screen } from '@testing-library/react';
import { testInitialState } from '../../store/products/products-slice';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('Должен правильно отрисовать', () => {
    const headerTestId = 'header';
    const basketTestId = 'basket-count';
    const expectedCount = 3;

    const { withStoreComponent } = withStore(<Header />, {
      PRODUCTS: {
        ...testInitialState,
        basket: Array.from({ length: expectedCount }, (_, index) => index),
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(basketTestId)).toBeInTheDocument();
    expect(Number(screen.getByTestId(basketTestId).textContent)).toBe(expectedCount);
  });
});
