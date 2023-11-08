import { render, screen } from '@testing-library/react';
import Reviews from '.';
import { makeFakeReview } from '../../test-mocks/test-mocks';
import { withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';

describe('Component: Reviews', () => {
  it('Должен проверить правильность отрисовки', () => {
    const reviewTestId = 'review';
    const mockExpectedReview = Array.from({length: 12}, makeFakeReview);
    const expectedCount = 3;

    const { withStoreComponent } = withStore(<Reviews />, {
      PRODUCTS: {
        ...testInitialState,
        reviews: mockExpectedReview,
      },
    });

    render(withStoreComponent);

    expect(screen.getAllByTestId(reviewTestId).length).toBe(expectedCount);
  });
});
