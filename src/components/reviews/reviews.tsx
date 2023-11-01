import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviews } from '../../store/products/selector';
import Rating from '../rating';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  setStatusActiveModal,
  setStatusModalReview,
} from '../../store/products/products-slice';

dayjs.locale('ru');

function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const [reviewsShowCount, setReviewShowCount] = useState<number>(3);

  const handleClick = () => {
    dispatch(setStatusActiveModal(true));
    dispatch(setStatusModalReview(true));
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleClick}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviews &&
              reviews.slice(0, reviewsShowCount).map((review) => (
                <li
                  className="review-card"
                  key={review.id}
                  data-testid="review"
                >
                  <div className="review-card__head">
                    <p className="title title--h4">{review.userName}</p>
                    <time
                      className="review-card__data"
                      dateTime={review.createAt}
                    >
                      {dayjs(review.createAt).format('DD MMMM')}
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <Rating rating={review.rating} />
                    <p className="visually-hidden">Оценка: {review.rating}</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">{review.advantage}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">{review.disadvantage}</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">{review.review}</p>
                    </li>
                  </ul>
                </li>
              ))}
          </ul>
          {reviews.length !== reviewsShowCount && (
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={() => setReviewShowCount(reviewsShowCount + 3)}
              >
                Показать больше отзывов
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Reviews;
