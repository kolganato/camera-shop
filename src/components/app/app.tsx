import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import { AppRoute } from '../../config';
import MainPage from '../../pages/main';
import BasketPage from '../../pages/basket';
import ProductPage from '../../pages/product';
import Page404 from '../../pages/404';


function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path={AppRoute.Product} element={<ProductPage />} />
            <Route path={AppRoute.NotFound} element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
