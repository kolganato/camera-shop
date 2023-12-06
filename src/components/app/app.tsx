import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import { AppRoute } from '../../config';
import MainPage from '../../pages/main';
import BasketPage from '../../pages/basket';
import ProductPage from '../../pages/product';
import Page404 from '../../pages/404';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {
  getHasError,
  getIsProductsLoading,
  getIsPromoLoading,
  getStatusBasket,
} from '../../store/products/selector';
import { getProductsAction, getPromoAction } from '../../store/api-actions';
import Spinner from '../spinner';
import ServerError from '../server-error';
import { fillBasket } from '../../store/products/products-slice';
import { ProductBasket } from '../../types/product-basket';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const isPromoLoading = useAppSelector(getIsPromoLoading);
  const hasError = useAppSelector(getHasError);
  const isEmptyBasket = useAppSelector(getStatusBasket);
  const basketByLocalStorage = localStorage.getItem('basket');

  useEffect(() => {
    if(isEmptyBasket && basketByLocalStorage){
      dispatch(fillBasket(JSON.parse(basketByLocalStorage) as ProductBasket[]));
    }
  }, [dispatch, isEmptyBasket, basketByLocalStorage]);

  useEffect(() => {
    if (!isProductsLoading) {
      dispatch(getProductsAction());
    }
    if (!isPromoLoading) {
      dispatch(getPromoAction());
    }
  }, [isProductsLoading, dispatch, isPromoLoading]);

  if(!isProductsLoading && !hasError){
    return <Spinner />;
  }

  if(hasError){
    return <ServerError />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
          <Route path={`${AppRoute.Catalog}/:id`} element={<ProductPage />} />
          <Route path={AppRoute.NotFound} element={<Page404 />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
