import { useAppDispatch, useAppSelector } from '../../hooks';
import { setProductToAdd } from '../../store/products/products-slice';
import { getBasket, getProducts } from '../../store/products/selector';
import { Product } from '../../types/product';
import ProductCard from '../product-card';

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const basket = useAppSelector(getBasket);

  const handleClick = (product: Product) => {
    dispatch(setProductToAdd(product));
  };

  return (
    <div className="cards catalog__cards">
      {products &&
        products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            inBasket={basket.includes(product.id)}
            onClick={handleClick}
          />
        ))}
    </div>
  );
}

export default ProductList;
