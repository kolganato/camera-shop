import { useAppSelector } from '../../hooks';
import {
  getProducts,
} from '../../store/products/selector';
import ProductCard from '../product-card';

function ProductList(): JSX.Element {
  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {products &&
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </div>
  );
}

export default ProductList;
