import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner';
import BreadCrumbs from '../../components/breadcrumbs';
import { AppRoute, TitlesPages } from '../../config';
import { Link } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <main data-testid="page-404">
      <Helmet>
        <title>{TitlesPages.NotFound}</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <BreadCrumbs title={TitlesPages.NotFound} />
        <div className="page-content__section">
          <div className="container">
            <h1 className="title title--h2">Страница не найдена</h1>
            <Link className="btn btn--purple" to={AppRoute.Root}>Вернуться на главную</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page404;
