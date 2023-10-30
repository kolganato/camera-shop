import { render, screen } from '@testing-library/react';
import Filter from '.';

describe('Component: Filter', () => {
  it('Должен проверить правильность отрисовки', () => {
    const filterTestId = 'filter';

    render(<Filter />);

    const filterContainer = screen.getByTestId(filterTestId);

    expect(filterContainer).toBeInTheDocument();
  });
});
