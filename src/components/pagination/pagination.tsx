import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getArrayCountPagesByProducts,
  getCountPagesByProducts,
  getCurrentPage,
} from '../../store/products/selector';
import {
  COUNT_PAGES_PAGIONATIONS_SHOW,
  DEFAULT_PAGE_NUMBER,
  getStartPagePagination,
} from '../../utils/common';
import classNames from 'classnames';
import { setCurrentPage } from '../../store/products/products-slice';
import { useEffect } from 'react';

function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const countPages = useAppSelector(getCountPagesByProducts);
  const arrayPages = useAppSelector(getArrayCountPagesByProducts);
  const currentPage = useAppSelector(getCurrentPage);
  const startPage = getStartPagePagination(currentPage, countPages, arrayPages);
  const countShowPages = arrayPages.slice(startPage, currentPage + 2);

  useEffect(()=>{
    if(searchParams.get('page')){
      dispatch(setCurrentPage(Number(searchParams.get('page'))));
    }else{
      dispatch(setCurrentPage(DEFAULT_PAGE_NUMBER));
    }
  }, [dispatch, currentPage, searchParams]);

  const handleClick = (evt: React.MouseEvent<HTMLElement>, page: number): void => {
    evt.preventDefault();
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {currentPage > DEFAULT_PAGE_NUMBER && (
          <li className="pagination__item">
            <Link
              onClick={(evt) => {
                evt.preventDefault();
                handleClick(evt, startPage);
              }}
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}?page=${startPage}`}
            >
              Назад
            </Link>
          </li>
        )}
        {countShowPages &&
          countShowPages.map((page) => (
            <li className="pagination__item" key={page}>
              <Link
                onClick={(evt) => {
                  handleClick(evt, page);
                }}
                className={classNames('pagination__link', {
                  'pagination__link--active': Number(currentPage) === page,
                })}
                to={`${AppRoute.Root}?page=${page}`}
              >
                {page}
              </Link>
            </li>
          ))}
        {currentPage + COUNT_PAGES_PAGIONATIONS_SHOW <= countPages &&
          countPages > COUNT_PAGES_PAGIONATIONS_SHOW && (
          <li className="pagination__item">
            <Link
              onClick={(evt) => {
                handleClick(evt, currentPage + COUNT_PAGES_PAGIONATIONS_SHOW);
              }}
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}?page=${
                currentPage + COUNT_PAGES_PAGIONATIONS_SHOW
              }`}
            >
                Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
