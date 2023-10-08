import Banner from '../../components/banner';

function Page404(): JSX.Element {
  return (
    <main>
      <Banner />
      <div className="page-content">
        <h1 className="title title--h2">Страница не найдена</h1>
      </div>
    </main>
  );
}

export default Page404;
