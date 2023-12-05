import { AppDispatch, State } from '../store';
import { AxiosInstance } from 'axios';

export type CombinedType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type Order = {
  camerasIds: number[];
  coupon: Coupon['coupon'] | null;
};

export type Coupon = {
  coupon: string;
  sales: number;
};
