import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { getProductsAction, getPromoAction } from '../../store/api-actions';

function ServerError(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleReloadClick = () => {
    dispatch(getProductsAction());
    dispatch(getPromoAction());
  };

  return (
    <HelmetProvider>
      <main data-testid="server-error">
        <Helmet>
          <title>Camera Shop - Ошибка сервера</title>
        </Helmet>
        <div className="page-content">
          <div className="page-content__section">
            <div className="container">
              <h1 className="title title--h2">Сервер не доступен</h1>
              <button
                onClick={handleReloadClick}
                className="btn btn--purple"
                type="button"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}

export default ServerError;
