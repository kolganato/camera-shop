import { render, screen } from '@testing-library/react';
import Footer from '.';

describe('Component: Footer', () => {
  it('Должен проверить правильность отрисовки', () => {
    const footerTestId = 'footer';

    render(<Footer />);

    const footerContainer = screen.getByTestId(footerTestId);

    expect(footerContainer).toBeInTheDocument();
  });
});
