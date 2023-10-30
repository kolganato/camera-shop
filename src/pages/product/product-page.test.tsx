import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { TIME_TO_RENDER_PAGE } from '../../config';
import { testInitialState } from '../../store/products/products-slice';
import MainPage from '.';
import { makeFakeProduct } from '../../test-mocks/test-mocks';

describe('Component: ProductPage', () => {
  it('Должен отрисовать компонент', () => {
    const testId = 'product-page';
    const mockProduct = makeFakeProduct();
    const expectedText = mockProduct.name;
    const expectedRating = `Рейтинг: ${mockProduct.rating}`;

    const { withStoreComponent } = withStore(<MainPage />, {
      PRODUCTS: {
        ...testInitialState,
        products: [mockProduct]
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.getByText(expectedRating)).toBeInTheDocument();

      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
