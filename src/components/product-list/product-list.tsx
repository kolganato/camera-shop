import { useAppDispatch, useAppSelector } from '../../hooks';
import { setProductToAdd, setStatusModalProduct } from '../../store/products/products-slice';
import { getBasket, getProductsShow } from '../../store/products/selector';
import { Product } from '../../types/product';
import ProductCard from '../product-card';

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsShow);
  const basket = useAppSelector(getBasket);

  const handleClick = (product: Product) => {
    dispatch(setProductToAdd(product));
    dispatch(setStatusModalProduct(true));
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
