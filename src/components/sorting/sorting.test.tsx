import { render, screen } from '@testing-library/react';
import Sorting from '.';


describe('Component: Sorting', () => {
  it('Должен проверить правильность отрисовки', () => {
    const sortingTestId = 'sorting';

    render(<Sorting />);

    const sortingContainer = screen.getByTestId(sortingTestId);

    expect(sortingContainer).toBeInTheDocument();
  });
});
