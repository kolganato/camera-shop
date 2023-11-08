import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppSelector } from '../../hooks';
import {
  getCountProductsInBasket,
} from '../../store/products/selector';
import FormSearch from '../form-search';

function Header(): JSX.Element {
  const countProductsInBasket = useAppSelector(getCountProductsInBasket);

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Root}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Root}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {countProductsInBasket > 0 && (
            <span className="header__basket-count" data-testid="basket-count">
              {countProductsInBasket}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
