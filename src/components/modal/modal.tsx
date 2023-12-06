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
import { useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useClosingModal;

  useEffect(() => {
    let isFocus = false;

    if((!isModalProduct && isModalProductSuccess) || (!isModalReview && isModalReviewSuccess)){
      isFocus = false;
    }

    if (isActive) {
      const handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          closeModal(dispatch);
        }

        if (evt.key === 'Tab') {
          evt.preventDefault();

          const childs = Array.from(modalRef.current?.querySelectorAll('a, button, input, textarea') ?? []) as [HTMLAnchorElement | HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement];

          for (let i = 0; i < childs.length; i++) {
            childs[i].tabIndex = 0;
          }

          if(modalRef.current !== null && !isFocus){
            modalRef.current.focus();
            isFocus = true;
            childs[0].focus();
          }

          const activeItem = document.activeElement;

          for (let i = 0; i < childs.length; i++){
            if(activeItem === childs[childs.length - 1]){
              childs[0].focus();
            }else if(activeItem === childs[i] && activeItem !== childs[childs.length - 1]){
              childs[i + 1].focus();
            }
          }

        }
      };

      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
        isFocus = false;
      };
    }
  }, [isActive, dispatch, closeModal, isModalProduct, isModalProductSuccess, isModalReview, isModalReviewSuccess]);

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
      ref={modalRef}
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
