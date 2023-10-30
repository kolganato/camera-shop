import { Product } from '../../types/product';

type RatingProps = {
  rating: Product['rating'];
};

function Rating({ rating }: RatingProps): JSX.Element {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <svg width={17} height={16} aria-hidden="true" key={index} data-testid="rating-value">
          <use xlinkHref={index < rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
    </>
  );
}

export default Rating;
