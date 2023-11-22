import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getProductsBySearchLive,
  getSearchLive,
} from '../../store/products/selector';
import { setSearchLive } from '../../store/products/products-slice';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../config';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const productsBySearchLive = useAppSelector(getProductsBySearchLive);
  const searchLive = useAppSelector(getSearchLive);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const ulRef = useRef<HTMLUListElement | null>(null);

  const handleClick = () => {
    dispatch(setSearchLive(''));
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  const moveFocusDown = (evt: React.KeyboardEvent) => {
    const childs = Array.from(ulRef.current?.children ?? []) as HTMLLIElement[];
    evt.preventDefault();

    const activeItem = document.activeElement;
    for (let i = 0; i < childs.length; i++) {
      const listLength = childs.length;
      if (
        activeItem === childs[i] &&
        activeItem !== childs[listLength - 1]
      ) {
        childs[i + 1].focus();
      }
    }
  };

  const moveFocusUp = (evt: React.KeyboardEvent) => {
    const childs = Array.from(ulRef.current?.children ?? []) as HTMLLIElement[];
    evt.preventDefault();

    const activeItem = document.activeElement;
    for (let i = 0; i < childs.length; i++) {
      if (activeItem === childs[i] && activeItem !== childs[0]) {
        childs[i - 1].focus();
      }
    }
  };

  return (
    <div
      className={classNames('form-search', {
        'list-opened': searchLive.length > 1,
      })}
      data-testid="form-search"
    >
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={(evt) => dispatch(setSearchLive(evt.target.value))}
            ref={inputRef}
          />
        </label>
        {searchLive.length >= 3 && productsBySearchLive.length >= 1 && (
          <ul className="form-search__select-list scroller" ref={ulRef}>
            {productsBySearchLive.map((item, index) => (
              <li
                className="form-search__select-item"
                tabIndex={0}
                key={item.id}
                id={`product-${index}`}
                onClick={() => {
                  navigate(`${AppRoute.Catalog}/${item.id}`);
                  handleClick();
                }}
                onKeyDown={(evt) => {
                  if (evt.key === 'ArrowDown') {
                    moveFocusDown(evt);
                  }
                  if (evt.key === 'ArrowUp') {
                    moveFocusUp(evt);
                  }
                  if (evt.key === 'Enter') {
                    navigate(`${AppRoute.Catalog}/${item.id}`);
                    handleClick();
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </form>
      <button className="form-search__reset" type="reset" onClick={handleClick}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
