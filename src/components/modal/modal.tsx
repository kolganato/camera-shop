import classNames from 'classnames';
import { useAppDispatch, useAppSelector, useClosingModal } from '../../hooks';
import {
  getIsModalOrderSuccess,
  getIsModalProduct,
  getIsModalProductSucess,
  getIsModalRemoveProduct,
  getIsModalReview,
  getIsModalReviewSuccess,
  getProductToAdd,
  getProductToRemove,
  getStatusReviewData,
  getStatusShowModal,
} from '../../store/products/selector';
import ModalAddingProduct from '../modal-adding-product';
import { useEffect } from 'react';
import ModalAddingSuccess from '../modal-adding-success';
import ModalAddingReview from '../modal-adding-review';
import { Product } from '../../types/product';
import {
  setStatusModalReviewSuccess,
  setStatusReviewData,
} from '../../store/products/products-slice';
import ModalReviewSuccess from '../modal-review-success';
import { Status } from '../../config';
import ModalRemoveProduct from '../modal-remove-product';
import ModalOrderSucces from '../modal-order-success';

type ModalProps = {
  id?: Product['id'];
};

function Modal({ id }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getStatusShowModal);
  const productToAdd = useAppSelector(getProductToAdd);
  const productToRemove = useAppSelector(getProductToRemove);
  const statusData = useAppSelector(getStatusReviewData);
  const isModalProduct = useAppSelector(getIsModalProduct);
  const isModalReview = useAppSelector(getIsModalReview);
  const isModalProductSuccess = useAppSelector(getIsModalProductSucess);
  const isModalReviewSuccess = useAppSelector(getIsModalReviewSuccess);
  const isModalRemoveProduct = useAppSelector(getIsModalRemoveProduct);
  const isModalOrderSuccess = useAppSelector(getIsModalOrderSuccess);

  const closeModal = useClosingModal;

  useEffect(() => {
    if (isActive) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          closeModal(dispatch);
        }
      };

      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isActive, dispatch, closeModal]);

  useEffect(() => {
    if (statusData === Status.Success) {
      dispatch(setStatusReviewData(Status.Idle));
      dispatch(setStatusModalReviewSuccess(true));
    }
  }, [statusData, dispatch]);

  return (
    <div
      className={classNames('modal', {
        'is-active': isActive,
        'modal--narrow': isModalProductSuccess,
      })}
      data-testid="modal"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => closeModal(dispatch)} />
        {isModalProduct && productToAdd && !isModalProductSuccess && (
          <ModalAddingProduct product={productToAdd} />
        )}
        {isModalProduct && productToAdd && isModalProductSuccess && (
          <ModalAddingSuccess />
        )}
        {isModalReview && !isModalReviewSuccess && id && (
          <ModalAddingReview productId={id} />
        )}
        {isModalReview && isModalReviewSuccess && <ModalReviewSuccess />}
        {isModalRemoveProduct && productToRemove && (
          <ModalRemoveProduct product={productToRemove} />
        )}
        {isModalOrderSuccess && <ModalOrderSucces />}
      </div>
    </div>
  );
}

export default Modal;
