import { render, screen } from '@testing-library/react';
import { testInitialState } from '../../store/products/products-slice';
import { withHistory, withStore } from '../../utils/mock-component';
import FormSearch from '.';

describe('Component: FormSearch', () => {
  it('Должен правильно отрисовать', () => {
    const FormSearchTestId = 'form-search';

    const { withStoreComponent } = withStore(<FormSearch />, {
      PRODUCTS: {
        ...testInitialState,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(FormSearchTestId)).toBeInTheDocument();
  });
});
