import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppDispatch, useClosingModal } from '../../hooks';
import { setProductToAdd } from '../../store/products/products-slice';

function ModalAddingSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const closeModal = useClosingModal;

  const handleClick = () => {
    dispatch(setProductToAdd(null));
    closeModal(dispatch);
  };

  return (
    <div className="modal__content" data-testid="modal-add-success">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleClick}>
          Продолжить покупки
        </button>
        <Link
          to={AppRoute.Basket}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={handleClick}
        >
          Перейти в корзину
        </Link>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={handleClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default ModalAddingSuccess;
