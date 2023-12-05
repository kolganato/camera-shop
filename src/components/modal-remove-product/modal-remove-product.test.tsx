import { withStore } from '../../utils/mock-component';
import {
  testInitialState,
} from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import ModalRemoveProduct from '.';
import { makeFakeProduct } from '../../test-mocks/test-mocks';

describe('Component: ModalRemoveProduct', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();

    const modalTestId = 'modal-remove-product';
    const expectedText = mockProduct.name;
    const { withStoreComponent } = withStore(
      <ModalRemoveProduct product={mockProduct} />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalRemoveProduct: true,
          basket: [{...mockProduct, count: 1}],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
