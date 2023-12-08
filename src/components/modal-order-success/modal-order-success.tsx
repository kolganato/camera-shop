import { AppRoute } from '../../config';
import { useAppDispatch, useClosingModal } from '../../hooks';
import browserHistory from '../../browser-history';

function ModalOrderSucces(): JSX.Element {
  const dispatch = useAppDispatch();
  const closeModal = useClosingModal;
  const history = browserHistory;

  const handleClose = () => {
    closeModal(dispatch);
  };

  const handleClick = () => {
    closeModal(dispatch);
    history.push(AppRoute.Root);
  };

  return (
    <div className="modal__content" data-testid="modal-order-success">
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleClick}
        >
          Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={handleClose}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default ModalOrderSucces;
