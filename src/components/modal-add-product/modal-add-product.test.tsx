import { withStore } from '../../utils/mock-component';
import {
  testInitialState,
} from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import ModalAddProduct from '.';
import { makeFakeProduct } from '../../test-mocks/test-mocks';

describe('Component: ModalAddProduct', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();

    const modalTestId = 'modal-add-product';
    const { withStoreComponent } = withStore(
      <ModalAddProduct product={mockProduct} />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalProduct: true,
          productToAdd: mockProduct,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });
});
