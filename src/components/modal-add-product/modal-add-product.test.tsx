import { withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import ModalAddProduct from '.';
import { makeFakeProduct } from '../../test-mocks/test-mocks';

describe('Component: Modal', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();
    const modalTestId = 'modal-add-product';
    const { withStoreComponent } = withStore(<ModalAddProduct product={mockProduct} onClick={} onCloseModal={} />, {
      PRODUCTS: {
        ...testInitialState,
        isActiveModal: true
      },
    });

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();

  });
});
