import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, State } from '../store';
import {
  setStatusActiveModal,
  setStatusModalProduct,
  setStatusModalReview,
} from '../store/products/products-slice';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useClosingModal = (dispatch: AppDispatch) => {
  dispatch(setStatusActiveModal(false));
  dispatch(setStatusModalProduct(false));
  dispatch(setStatusModalReview(false));
};
