import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsModalProduct,
  getIsModalProductSucess,
  getIsModalReview,
  getIsModalReviewSuccess,
  getProductToAdd,
  getStatusReviewData,
  getStatusShowModal,
} from '../../store/products/selector';
import ModalAddProduct from '../modal-add-product';
import { useCallback, useEffect, useState } from 'react';
import ModalAddSuccess from '../modal-add-success';
import ModalAddReview from '../modal-add-review';
import { Product } from '../../types/product';
import {
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalProductSuccess,
  setStatusModalReview,
  setStatusModalReviewSuccess,
  setStatusReviewData,
} from '../../store/products/products-slice';
import ModalReviewSuccess from '../modal-review-success';
import { Status } from '../../config';

type ModalProps = {
  id?: Product['id'];
};

function Modal({ id }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getStatusShowModal);
  const productToAdd = useAppSelector(getProductToAdd);
  const statusData = useAppSelector(getStatusReviewData);
  const isModalProduct = useAppSelector(getIsModalProduct);
  const isModalReview = useAppSelector(getIsModalReview);
  const isModalProductSuccess = useAppSelector(getIsModalProductSucess);
  const isModalReviewSuccess = useAppSelector(getIsModalReviewSuccess);

  const closeModal = useCallback(() => {
    dispatch(setStatusActiveModal(false));
    dispatch(setStatusModalProduct(false));
    dispatch(setStatusModalReview(false));
    dispatch(setStatusModalProductSuccess(false));
    dispatch(setStatusModalReviewSuccess(false));
  }, [dispatch]);

  useEffect(() => {
    if (isActive) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
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
        <div className="modal__overlay" onClick={closeModal} />
        {isModalProduct && productToAdd && !isModalProductSuccess && (
          <ModalAddProduct product={productToAdd} closeModal={closeModal} />
        )}
        {isModalProduct && productToAdd && isModalProductSuccess && (
          <ModalAddSuccess closeModal={closeModal} />
        )}
        {isModalReview && !isModalReviewSuccess && id && (
          <ModalAddReview productId={id} closeModal={closeModal} />
        )}
        {isModalReview && isModalReviewSuccess && (
          <ModalReviewSuccess closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}

export default Modal;
