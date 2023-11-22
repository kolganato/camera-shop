import { SubmitHandler, useForm } from 'react-hook-form';
import { SortingDirection, SortingType } from '../../config';
import { useAppDispatch } from '../../hooks';
import {
  setSortingDirection,
  setSortingType,
} from '../../store/products/products-slice';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  getCurrentSortingDirection,
  getCurrentSortingType,
} from '../../utils/common';

type FormSorting = {
  type: SortingType;
  direction: SortingDirection;
};

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortingType = getCurrentSortingType(
    searchParams.get('sortingType')
  );
  const currentSortingDirection = getCurrentSortingDirection(
    searchParams.get('sortingDirection')
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  const resetFormRef = () => {
    if (formRef.current !== null) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    dispatch(setSortingType(currentSortingType));
    dispatch(setSortingDirection(currentSortingDirection));

    return () => {
      resetFormRef();
    };
  }, [searchParams, dispatch, currentSortingType, currentSortingDirection]);

  const { register, handleSubmit } = useForm<FormSorting>();

  const onChange: SubmitHandler<FormSorting> = (data: FormSorting): void => {
    searchParams.set('sortingType', data.type);
    searchParams.set('sortingDirection', data.direction);

    if (data.type === null) {
      searchParams.set('sortingType', SortingType.Price);
    }

    if (data.direction === null) {
      searchParams.set('sortingDirection', SortingDirection.LowToHigh);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-sort" data-testid="sorting">
      <form
        action="#"
        onChange={(evt) => void handleSubmit(onChange)(evt)}
        ref={formRef}
        onKeyDown={(evt) => {
          if (evt.key === 'ArrowDown') {
            evt.preventDefault();
            searchParams.set('sortingDirection', SortingDirection.HighToLow);

            if (searchParams.get('sortingType') === null) {
              searchParams.set('sortingType', SortingType.Price);
            }

            setSearchParams(searchParams);
          }

          if (evt.key === 'ArrowUp') {
            evt.preventDefault();
            searchParams.set('sortingDirection', SortingDirection.LowToHigh);

            if (searchParams.get('sortingType') === null) {
              searchParams.set('sortingType', SortingType.Price);
            }

            setSearchParams(searchParams);
          }
        }}
      >
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              {currentSortingType === SortingType.Price && (
                <input
                  type="radio"
                  id={SortingType.Price}
                  defaultChecked
                  value={SortingType.Price}
                  {...register('type')}
                />
              )}
              {currentSortingType !== SortingType.Price && (
                <input
                  type="radio"
                  id={SortingType.Price}
                  value={SortingType.Price}
                  {...register('type')}
                />
              )}
              <label htmlFor={SortingType.Price}>по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              {currentSortingType === SortingType.Popular && (
                <input
                  type="radio"
                  id={SortingType.Popular}
                  value={SortingType.Popular}
                  defaultChecked
                  {...register('type')}
                />
              )}
              {currentSortingType !== SortingType.Popular && (
                <input
                  type="radio"
                  id={SortingType.Popular}
                  value={SortingType.Popular}
                  {...register('type')}
                />
              )}
              <label htmlFor={SortingType.Popular}>по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              {currentSortingDirection === SortingDirection.LowToHigh && (
                <input
                  type="radio"
                  id={SortingDirection.LowToHigh}
                  value={SortingDirection.LowToHigh}
                  defaultChecked
                  aria-label="по возрастанию"
                  {...register('direction')}
                />
              )}
              {currentSortingDirection !== SortingDirection.LowToHigh && (
                <input
                  type="radio"
                  id={SortingDirection.LowToHigh}
                  value={SortingDirection.LowToHigh}
                  aria-label="по возрастанию"
                  {...register('direction')}
                />
              )}
              <label htmlFor={SortingDirection.LowToHigh}>
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              {currentSortingDirection === SortingDirection.HighToLow && (
                <input
                  type="radio"
                  id={SortingDirection.HighToLow}
                  value={SortingDirection.HighToLow}
                  aria-label="по убыванию"
                  defaultChecked
                  {...register('direction')}
                />
              )}
              {currentSortingDirection !== SortingDirection.HighToLow && (
                <input
                  type="radio"
                  id={SortingDirection.HighToLow}
                  value={SortingDirection.HighToLow}
                  aria-label="по убыванию"
                  {...register('direction')}
                />
              )}
              <label htmlFor={SortingDirection.HighToLow}>
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;
