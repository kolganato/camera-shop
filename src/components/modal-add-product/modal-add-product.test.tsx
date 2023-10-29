import { withHistory, withStore } from '../../utils/mock-component';
import {
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalProductSuccess,
  setStatusModalReview,
  setStatusModalReviewSuccess,
  testInitialState,
} from '../../store/products/products-slice';
import { render, renderHook, screen } from '@testing-library/react';
import ModalAddProduct from '.';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { useAppDispatch, useClosingModal } from '../../hooks';

describe('Component: ModalAddProduct', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();

    const modalTestId = 'modal-add-product';
    const { withStoreComponent } = withStore(
      <ModalAddProduct product={mockProduct} closeModal={() => renderHook(() => useClosingModal())} />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalProduct: true,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
  });
});
