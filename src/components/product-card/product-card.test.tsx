import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import {
  setProductToAdd,
  setStatusModalProduct,
  testInitialState,
} from '../../store/products/products-slice';
import ProductCard from '.';
import { Product } from '../../types/product';
import { createMemoryHistory } from 'history';
import { AppRoute, TIME_TO_RENDER_PAGE } from '../../config';

describe('Component: ProductCard', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();
    const productTestId = 'product-card';
    const expectedText = mockProduct.name;

    const handleClick = (product: Product) => {
      setProductToAdd(product);
      setStatusModalProduct(true);
    };

    const { withStoreComponent } = withStore(
      <ProductCard
        inBasket={false}
        product={mockProduct}
        onClick={handleClick}
      />,
      {
        PRODUCTS: {
          ...testInitialState,
          products: [mockProduct],
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Должен перейти на страницу продукта', () => {
    const mockHistory = createMemoryHistory();

    const mockProduct = makeFakeProduct();
    const productId = mockProduct.id;

    const handleClick = (product: Product) => {
      setProductToAdd(product);
      setStatusModalProduct(true);
    };

    const withHistoryComponent = withHistory(
      <ProductCard
        inBasket={false}
        product={mockProduct}
        onClick={handleClick}
      />,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        PRODUCTS: {
          ...testInitialState,
          products: [mockProduct],
        },
      }
    );
    mockHistory.push(`${AppRoute.Catalog}/${productId}`);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
