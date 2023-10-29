import { render, screen } from '@testing-library/react';
import Rating from '.';

describe('Component: Rating', () => {
  it('Должен проверить правильность отрисовки', () => {
    const expectedCount = 5;
    const ratingValueTestId = 'rating-value';

    render(<Rating rating={expectedCount} />);
    const ratingValues = screen.getAllByTestId(ratingValueTestId);

    expect(ratingValues.length).toBe(expectedCount);
  });
});
