import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BreadCrumbs from '.';
import { TitlesPages } from '../../config';

describe('Component: BreadCrumbs', () => {
  it('Должен отрисовать компонент', () => {
    const breadcrumbsTestId = 'breadcrumbs';
    const expectedText = TitlesPages.Catalog;

    const { withStoreComponent } = withStore(<BreadCrumbs title={TitlesPages.Catalog} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(breadcrumbsTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
