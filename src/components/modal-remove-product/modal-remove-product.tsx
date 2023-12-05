import { useAppDispatch, useClosingModal } from '../../hooks';
import {
  removeProductFromBasket,
  setProductToRemove,
} from '../../store/products/products-slice';
import { Product } from '../../types/product';

type ModalRemoveProductProps = {
  product: Product;
};

function ModalRemoveProduct({ product }: ModalRemoveProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const closeModal = useClosingModal;

  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    level,
    category,
    type,
  } = product;

  return (
    <div className="modal__content" data-testid="modal-remove-product">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
            />
            <img
              src={previewImg}
              srcSet={`${previewImg2x} 2x`}
              width={140}
              height={120}
              alt={`${category} ${name}`}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${type} ${category.toLocaleLowerCase()}`}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={() => {
            dispatch(removeProductFromBasket(id));
            dispatch(setProductToRemove(null));
            closeModal(dispatch);
          }}
        >
          Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(setProductToRemove(null));
            closeModal(dispatch);
          }}
        >
          Продолжить покупки
        </a>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => {
          dispatch(setProductToRemove(null));
          closeModal(dispatch);
        }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default ModalRemoveProduct;
