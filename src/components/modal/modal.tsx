import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsModalProduct,
  getIsModalReview,
  getProductToAdd,
  getStatusReviewData,
  getStatusShowModal,
} from '../../store/products/selector';
import ModalAddProduct from '../modal-add-product';
import { useEffect, useState } from 'react';
import ModalAddSuccess from '../modal-add-success';
import ModalAddReview from '../modal-add-review';
import { Product } from '../../types/product';
import { setStatusActiveModal, setStatusModalProduct, setStatusModalReview } from '../../store/products/products-slice';
import ModalReviewSuccess from '../modal-review-success';
import { Status } from '../../config';

type ModalProps = {
  id?: Product['id'];
};

function Modal({ id }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getStatusShowModal);
  const productToAdd = useAppSelector(getProductToAdd);
  const [isProductSuccess, setIsProductSuccess] = useState<boolean>(false);
  const [isReviewSuccess, setIsReviewSuccess] = useState<boolean>(false);
  const statusData = useAppSelector(getStatusReviewData);

  const isModalProduct = useAppSelector(getIsModalProduct);
  const isModalReview = useAppSelector(getIsModalReview);

  useEffect(() => {
    if (isActive) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          dispatch(setStatusActiveModal(false));
          dispatch(setStatusModalProduct(false));
          dispatch(setStatusModalReview(false));
        }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isActive, dispatch]);

  useEffect(() => {
    if(statusData === Status.Success){
      setIsReviewSuccess(true);
    }
  },[statusData]);

  const closeModal = () => {
    dispatch(setStatusActiveModal(false));
    dispatch(setStatusModalProduct(false));
    dispatch(setStatusModalReview(false));
  };

  return (
    <div
      className={classNames('modal', {
        'is-active': isActive,
        'modal--narrow': isProductSuccess,
      })}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={closeModal}
        />
        {isModalProduct && productToAdd && !isProductSuccess && (
          <ModalAddProduct product={productToAdd} onClick={setIsProductSuccess} onCloseModal={closeModal} />
        )}
        {isModalProduct && productToAdd && isProductSuccess && (
          <ModalAddSuccess onClick={setIsProductSuccess} />
        )}
        {isModalReview && !isReviewSuccess && id && <ModalAddReview onSuccess={setIsReviewSuccess} productId={id} onCloseModal={closeModal} />}
        {isModalReview && isReviewSuccess && <ModalReviewSuccess onCloseModal={closeModal} />}
      </div>
    </div>
  );
}

export default Modal;
