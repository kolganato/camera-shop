import { withStore } from '../../utils/mock-component';
import {
  testInitialState,
} from '../../store/products/products-slice';
import { render, screen } from '@testing-library/react';
import ModalOrderSucces from '.';
import { Status } from '../../config';

describe('Component: ModalOrderSuccess', () => {
  it('Должен отрисовать компонент', () => {
    const modalTestId = 'modal-order-success';
    const expectedText = 'Спасибо за покупку';
    const { withStoreComponent } = withStore(
      <ModalOrderSucces />,
      {
        PRODUCTS: {
          ...testInitialState,
          isActiveModal: true,
          isModalOrderSuccess: true,
          statusOrderData: Status.Success
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
