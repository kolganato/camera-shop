import { withStore } from '../../utils/mock-component';
import {
  testInitialState,
} from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import ModalReviewSuccess from '.';

describe('Component: ModalReviewSuccess', () => {
  it('Должен отрисовать компонент', () => {
    const expectedText = 'Спасибо за отзыв';
    const modalTestId = 'modal-review-success';
    const { withStoreComponent } = withStore(
      <ModalReviewSuccess />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalReview: true,
          isModalReviewSuccess: true,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });
});
