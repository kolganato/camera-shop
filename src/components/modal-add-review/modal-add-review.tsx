import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { Review } from '../../types/review';
import { RATING } from '../../config';
import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/product';
import { fetchReviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type RatingElementProps = {
  rating: number;
  title: string;
  setRatingShow: (rating: number) => void;
  register: UseFormRegister<Review>;
};

function FormRatingElement({
  rating,
  title,
  setRatingShow,
  register,
}: RatingElementProps): JSX.Element {
  return (
    <>
      <input
        className="visually-hidden"
        id={`star-${rating}`}
        {...register('rating', {
          required: true,
          value: Number(rating),
          min: 1,
          max: 5,
        })}
        type="radio"
        defaultValue={rating}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating}`}
        title={title}
        onClick={() => setRatingShow(Number(rating))}
      />
    </>
  );
}

type ModalAddReviewProps = {
  productId: Product['id'];
  onCloseModal: () => void;
  onSuccess: (isSuccess: boolean) => void;
};

function ModalAddReview({ productId, onCloseModal }: ModalAddReviewProps): JSX.Element {
  const [ratingShow, setRatingShow] = useState<number>(0);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>();

  const onSubmit: SubmitHandler<Review> = (data: Review) => {
    dispatch(fetchReviewAction({
      ...data,
      rating: Number(data.rating),
      cameraId: productId,
    }));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          action=''
          onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
        >
          <div className="form-review__rate">
            <fieldset
              className={classNames('rate form-review__item', {
                'is-invalid': errors.rating,
              })}
            >
              <legend className="rate__caption">
                Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {Array.from(Object.entries(RATING))
                    .map(([rating, title]) => (
                      <FormRatingElement
                        key={rating}
                        rating={Number(rating)}
                        title={title}
                        setRatingShow={setRatingShow}
                        register={register}
                      />
                    ))
                    .reverse()}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{ratingShow}</span>{' '}
                  <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div
              className={classNames('custom-input form-review__item', {
                'is-invalid': errors.userName,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  {...register('userName', {
                    required: true,
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов',
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁa-zA-Z -,.!]+$/,
                      message: 'Введите валидное значение',
                    },
                  })}
                  placeholder="Введите ваше имя"
                />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div
              className={classNames('custom-input form-review__item', {
                'is-invalid': errors.advantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  {...register('advantage', {
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов',
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁa-zA-Z -,.!]+$/,
                      message: 'Введите валидное значение',
                    },
                    required: {
                      value: true,
                      message: 'Нужно указать достоинства',
                    },
                  })}
                  placeholder="Основные преимущества товара"
                />
              </label>
              <p className="custom-input__error">{errors.advantage?.message}</p>
            </div>
            <div
              className={classNames('custom-input form-review__item', {
                'is-invalid': errors.disadvantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  {...register('disadvantage', {
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов',
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁa-zA-Z -,.!]+$/,
                      message: 'Введите валидное значение',
                    },
                    required: {
                      value: true,
                      message: 'Нужно указать недостатки',
                    },
                  })}
                  placeholder="Главные недостатки товара"
                />
              </label>
              <p className="custom-input__error">
                {errors.disadvantage?.message}
              </p>
            </div>
            <div
              className={classNames('custom-input form-review__item', {
                'is-invalid': errors.review,
              })}
            >
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  {...register('review', {
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов',
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁa-zA-Z -,.!]+$/,
                      message: 'Введите валидное значение',
                    },
                    required: {
                      value: true,
                      message: 'Нужно добавить комментарий',
                    },
                    value: '',
                  })}
                  placeholder="Поделитесь своим опытом покупки"
                />
              </label>
              <div className="custom-textarea__error">
                Нужно добавить комментарий
              </div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
          </button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default ModalAddReview;
