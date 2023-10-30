import { Link, useLocation } from 'react-router-dom';
import { AppRoute, TitlesPages } from '../../config';
import { Product } from '../../types/product';

type BreadCrumbsProps = {
  title: TitlesPages | Product['name'];
};

function BreadCrumbs({ title }: BreadCrumbsProps): JSX.Element {
  const { pathname } = useLocation();
  const isMainPage = pathname === AppRoute.Root;

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>
              {TitlesPages.Root}
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          {!isMainPage && (
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoute.Root}>
                {TitlesPages.Catalog}
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
          )}
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
              {title}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbs;
