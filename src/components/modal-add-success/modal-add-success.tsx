import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppDispatch } from '../../hooks';
import { setProductToAdd } from '../../store/products/products-slice';

type ModalProps = {
  // onClick: (showModalSucces: boolean) => void;
  closeModal: () => void;
};

function ModalAddSuccess({ closeModal }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setProductToAdd(null));
    // onClick(false);
    closeModal();
  };

  return (
    <div className="modal__content">
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

export default ModalAddSuccess;
