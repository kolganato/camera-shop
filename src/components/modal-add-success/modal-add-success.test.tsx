import { withHistory, withStore } from '../../utils/mock-component';
import {
  testInitialState,
} from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import ModalAddSuccess from '.';

describe('Component: ModalAddSuccess', () => {
  it('Должен отрисовать компонент', () => {
    const mockProduct = makeFakeProduct();
    const expectedText = 'Товар успешно добавлен в корзину';

    const modalTestId = 'modal-add-success';
    const { withStoreComponent } = withStore(
      <ModalAddSuccess />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalProduct: true,
          isModalProductSuccess: true,
          productToAdd: mockProduct,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
