import { useAppSelector } from '../../hooks';
import { getCountProducts } from '../../store/products/selector';
import { COUNT_PRODUCTS_SHOW } from '../../utils/common';
import Filter from '../filter';
import Pagination from '../pagination';
import ProductList from '../product-list';
import Sort from '../sorting';

function Catalog(): JSX.Element {
  const countProducts = useAppSelector(getCountProducts);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <Filter />
          </div>
          <div className="catalog__content">
            <Sort />
            <ProductList />
            {!(countProducts <= COUNT_PRODUCTS_SHOW) && <Pagination /> }
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
