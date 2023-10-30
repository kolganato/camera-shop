import { withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';
import Modal from './modal';
import { render, screen } from '@testing-library/react';

describe('Component: Modal', () => {
  it('Должен отрисовать компонент', () => {
    const modalTestId = 'modal';
    const { withStoreComponent } = withStore(<Modal />, {
      PRODUCTS: {
        ...testInitialState,
        isActiveModal: true
      },
    });

    render(withStoreComponent);

    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();

  });
});
