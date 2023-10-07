import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import { AppRoute } from '../../config';
import MainPage from '../../pages/main';


function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />} >
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
