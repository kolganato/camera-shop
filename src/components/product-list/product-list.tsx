import { useDeferredValue } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setProductToAdd,
  setStatusModalProduct,
} from '../../store/products/products-slice';
import { getBasket, getProductsShow } from '../../store/products/selector';
import { Product } from '../../types/product';
import ProductCard from '../product-card';

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsShow);
  const basket = useAppSelector(getBasket);
  const defferedProducts = useDeferredValue(products);

  const handleClick = (product: Product) => {
    dispatch(setProductToAdd(product));
    dispatch(setStatusModalProduct(true));
  };

  if (defferedProducts.length === 0) {
    return <p>По вашему запросу ничего не найдено</p>;
  }

  return (
    <div className="cards catalog__cards" data-testid="product-list">
      {defferedProducts &&
        defferedProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            inBasket={basket.some((item) => item.id === product.id)}
            onClick={handleClick}
            data-testid="product-card"
          />
        ))}
    </div>
  );
}

export default ProductList;
