import { render, screen } from '@testing-library/react';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';
import SimilarProducts from '.';

describe('Component: SimilarProducts', () => {
  it('Должен проверить правильность отрисовки', () => {
    const similarTestId = 'similar';
    const slideCardTestId = 'slide-card';
    const mockSimilarProducts = Array.from({length: 12}, makeFakeProduct);
    const expectedText = 'Похожие товары';

    const { withStoreComponent } = withStore(<SimilarProducts products={mockSimilarProducts} />, {
      PRODUCTS: {
        ...testInitialState,
        similarProducts: mockSimilarProducts,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(similarTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByTestId(slideCardTestId).length).toBe(mockSimilarProducts.length);
  });
});
