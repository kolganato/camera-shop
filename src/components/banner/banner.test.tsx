import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakePromo } from '../../test-mocks/test-mocks';
import { testInitialState } from '../../store/products/products-slice';
import Banner from '.';

describe('Component: Banner', () => {
  it('Должен отрисовать компонент', () => {
    const promo = Array.from({length: 3}, makeFakePromo);
    const bannerTestId = 'banner';
    const promoTestId = 'promo';

    const { withStoreComponent } = withStore(<Banner />, {
      PRODUCTS: {
        ...testInitialState,
        promo
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(bannerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(promoTestId).length).toBe(promo.length);
  });
});
