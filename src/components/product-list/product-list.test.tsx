import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import {
  testInitialState,
} from '../../store/products/products-slice';
import ProductList from '.';
import { COUNT_PRODUCTS_SHOW } from '../../utils/common';

describe('Component: ProductList', () => {
  it('Должен отрисовать компонент', () => {
    const mockProducts = Array.from({length: 30}, makeFakeProduct);
    const productListTestId = 'product-list';
    const productCardTestId = 'product-card';
    const expectedCount = COUNT_PRODUCTS_SHOW;

    const { withStoreComponent } = withStore(
      <ProductList />,
      {
        PRODUCTS: {
          ...testInitialState,
          products: mockProducts,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(productListTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(productCardTestId).length).toBe(expectedCount);
  });
});
