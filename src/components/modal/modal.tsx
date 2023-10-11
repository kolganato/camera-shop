import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import {
  getProductToAdd,
  getStatusShowModal,
} from '../../store/products/selector';
import ModalAddProduct from '../modal-add-product';
import { useState } from 'react';
import ModalAddSuccess from '../modal-add-success';

function Modal(): JSX.Element {
  const isActive = useAppSelector(getStatusShowModal);
  const productToAdd = useAppSelector(getProductToAdd);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);

  return (
    <div
      className={classNames('modal', {
        'is-active': isActive,
        'modal--narrow': isShowSuccess,
      })}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        {productToAdd && !isShowSuccess && <ModalAddProduct product={productToAdd} onClick={setIsShowSuccess}/>}
        {productToAdd && isShowSuccess && <ModalAddSuccess onClick={setIsShowSuccess} />}
      </div>
    </div>
  );
}

export default Modal;
