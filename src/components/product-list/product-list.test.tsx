import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import {
  testInitialState,
} from '../../store/products/products-slice';
import ProductList from '.';
import { COUNT_PRODUCTS_SHOW } from '../../utils/common';
import { TIME_TO_RENDER_PAGE } from '../../config';

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

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(productListTestId)).toBeInTheDocument();
      expect(screen.getAllByTestId(productCardTestId).length).toBe(expectedCount);

      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
