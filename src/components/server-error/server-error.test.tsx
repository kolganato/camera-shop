import { render, screen } from '@testing-library/react';
import { testInitialState } from '../../store/products/products-slice';
import { withHistory, withStore } from '../../utils/mock-component';
import ServerError from '.';

describe('Component: ServerError', () => {
  it('Должен отрисовать компонент', () => {
    const serverErrorTestId = 'server-error';
    const expectedText = 'Сервер не доступен';

    const { withStoreComponent } = withStore(<ServerError />, {
      PRODUCTS: {
        ...testInitialState,
        hasError: true,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(serverErrorTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
