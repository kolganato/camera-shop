import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner';
import BreadCrumbs from '../../components/breadcrumbs';
import Catalog from '../../components/catalog';
import Modal from '../../components/modal/modal';
import { TitlesPages } from '../../config';


function MainPage(): JSX.Element {
  return (
    <main>
      <Helmet>
        <title>{TitlesPages.Catalog}</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <BreadCrumbs title={TitlesPages.Catalog} />
        <Catalog />
      </div>
      <Modal />
    </main>
  );
}

export default MainPage;
