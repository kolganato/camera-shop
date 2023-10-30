import { render, screen } from '@testing-library/react';
import Catalog from '.';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { testInitialState } from '../../store/products/products-slice';

describe('Component: Catalog', () => {
  it('Должен отрисовать компонент', () => {
    const products = [makeFakeProduct()];
    const catalogTestId = 'catalog';
    const expectedText = 'Каталог фото- и видеотехники';

    const { withStoreComponent } = withStore(<Catalog />, {
      PRODUCTS: {
        ...testInitialState,
        products
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(catalogTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
