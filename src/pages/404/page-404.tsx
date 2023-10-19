import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner';
import BreadCrumbs from '../../components/breadcrumbs';
import { TitlesPages } from '../../config';

function Page404(): JSX.Element {
  return (
    <main>
      <Helmet>
        <title>{TitlesPages.NotFound}</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <BreadCrumbs title={TitlesPages.NotFound}/>
        <div className="page-content__section">
          <h1 className="title title--h2">Страница не найдена</h1>
        </div>
      </div>
    </main>
  );
}

export default Page404;
