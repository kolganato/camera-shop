import { render, screen } from '@testing-library/react';
import Spinner from '.';

describe('Component: Spinner', () => {
  it('Должен проверить правильность отрисовки', () => {
    const spinnerTestId = 'spinner';

    render(<Spinner />);

    const spinnerContainer = screen.getByTestId(spinnerTestId);

    expect(spinnerContainer).toBeInTheDocument();
  });
});
